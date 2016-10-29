// webpack classes
const {
  ContextReplacementPlugin,
  DefinePlugin,
  ProgressPlugin,
  NoErrorsPlugin
} = require('webpack');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const { ForkCheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { root, hasProcessFlag } = require('./webpack.utils.js');

// host to bind devserver to
const HOST = 'localhost';

// port to listen at
const PORT = 8080;

// exclude these sourcemaps
const EXCLUDE_SOURCE_MAPS = [
  // these packages have problems with their sourcemaps
  root('node_modules/@angular'),
  root('node_modules/rxjs')
]

// directory with compiled ts files
// must match tsconfig*
const COMPILED_APP_DIR = root("compiled/src/app");

// get npm lifecycle event to identify the environment
const EVENT = process.env.npm_lifecycle_event || '';
const PROD = EVENT.includes('prod');
const AOT = EVENT.includes('aot');
const HMR = hasProcessFlag('hot');

// print the environment
console.log('PROD : ', PROD);
console.log('AOT  : ', AOT);
console.log('HMR  : ', HMR);

// constants to be defined in the code to build
const CONSTANTS = {
  AOT: AOT,
  ENV: PROD ? JSON.stringify('production') : JSON.stringify('development'),
  HMR: HMR,
  HOST: JSON.stringify(HOST),
  PORT: PORT
};

// webpack loaders
var loaders = [
  {
    test: /\.js$/,
    loader: 'source-map-loader',
    exclude: [EXCLUDE_SOURCE_MAPS]
  },
  {
    test: /\.ts$/,
    loaders: [
      '@angularclass/hmr-loader',
      'awesome-typescript-loader',
      'angular2-template-loader',
      'angular2-router-loader?loader=system&genDir=' + COMPILED_APP_DIR + '&aot=' + AOT
    ],
    exclude: [/\.(spec|e2e|d)\.ts$/]
  },
  // merge all css used in src/app (angular) into js files
  { test: /\.css$/, include: root('src/app'), loader: 'raw!postcss' },
  { test: /\.html/, loader: 'raw-loader', exclude: [root('src/index.html')] }
];

if (HMR) {
  loaders.push(
  // include global css in <style> tags for HMR
  {
    test: /\.css$/,
    exclude: root('src/app'),
    loader: ['style','css']
  }
);
} else {
  loaders.push(
    // global css into a separate css bundle file
    {
      test: /\.css$/,
      exclude: root('src/app'),
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: ['css', 'postcss']
      })
    }
  );
}

module.exports = function makeWebpackConfig() {
  var config = {};

  // entry
  config.entry = {
    //  'polyfills': './src/polyfills.ts',
    'app': AOT ? './src/main.aot.ts' : './src/main.ts' // our app
  };

  config.resolve = {
    extensions: ['.ts', '.js']
  };

  config.module = {
    rules: loaders
  };

  config.plugins = [
    // to get rid of WARNINGs for @angular/core/src/linker/
    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      root('src')
    ),
	// show build progress
    new ProgressPlugin(),
    // does type checking in a separate process, so webpack doesn't need to wait.
    // Significantly improves development workflow
    new ForkCheckerPlugin(),
    // allows you to create global constants which can be configured at compile time.
    new DefinePlugin(CONSTANTS),
    // extract text bundle for global style bundle
    new ExtractTextPlugin("styles.css"),
    // prints more readable module names in the browser console on HMR updates
    new NamedModulesPlugin(),
    // Adding JS and CSS into a HTML template
    new HtmlWebpackPlugin({
	  filename: 'index.html',
      title: 'Angular 2 App',
      template: root('src/public/index.ejs'),
      chunksSortMode: 'dependency'
    })
  ];

  if (PROD) {
    config.plugins.push(
      // When there are errors while compiling, this plugin skips the emitting phase
      // (and recording phase), so there are no assets emitted that include errors.
      new NoErrorsPlugin(),
      // Mangles and optimizes resulting bundle
      new UglifyJsPlugin({
        beautify: false,
        comments: false
      }),
      // Copy assets from the public folder
      new CopyWebpackPlugin([{ from: root('src/public') }], {
        ignore: [root('src/public/index.ejs')]
      })
    );
  }

  // cache generated modules and chunks to improve performance
  // for multiple incremental builds
  config.cache = true;

  // developer tool to enhance debugging
  config.devtool = PROD ? 'source-map' : config.devtool = 'eval';

  // putput bundle target
  config.output = {
    path: root('dist'),
    filename: 'index.js'
  };

  // development serer config
  config.devServer = {
    contentBase: AOT ? COMPILED_APP_DIR : root('src/public'),
    host: HOST,
    port: PORT,
    historyApiFallback: true,
    watchOptions: {
      poll: undefined,
      aggregateTimeout: 300,
      ignored: /node_modules/
    }
  };

  return config;
}();
