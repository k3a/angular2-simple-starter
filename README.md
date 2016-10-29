## Simple Angular 2 Starter

Tired of complicated starters with 300MB of dependencies which are hard to understand and modify?

Try this simple well-commented starter with minimum dependencies.

Inspired by [@alicoding/react-webpack-babel](https://github.com/alicoding/react-webpack-babel).

### What's this and what's in it?

* Simple example modular Angular 2 app with CSS
* Webpack configuration for development (with hot reloading) and production (AOT, minification)
* CSS module loading, so you can import global styles using `import`
* Router because every nontrivial app needs it
* Postcss with autoprefixer as en example of configuring webpack loaders
* Nothing else because who needs tests or other features, can add them

### To run

* You'll need to have [git](https://git-scm.com/) and [node](https://nodejs.org/en/) installed in your system.
* Fork and clone the project:

```
> $ git clone THIS_REPO_URL
```

* Then install the dependencies:

```
> $ npm install
```

* Run development server:

```
> $ npm start
```

Open the web browser to `http://localhost:8080/`

### To build production package

```
> $ npm run compile
```

Will compile Angular templates (AOT) and build final product into `./dist` directory.

* Test the production build

```
> $ npm run prodserv
```

### Nginx Config

Here is a suggested Nginx config:
```
server {
	# ... root and other options

	gzip on;
	gzip_http_version 1.1;
	gzip_types text/plain text/css text/xml application/javascript image/svg+xml;

	location ~ \.html?$ {
		expires 1d;
	}

	location ~ \.(svg|ttf|js|css|svgz|eot|otf|woff|jpg|jpeg|gif|png|ico)$ {
		access_log off;
		log_not_found off;
		expires max;
	}
}
```

### Contribute
Please contribute to the project if you think something can be done better, including this README. :)

### Credits

Inspired by these repos:

* [@preboot/angular2-webpack](https://github.com/preboot/angular2-webpack)
* [@qdouble/angular-webpack2-starter](https://github.com/qdouble/angular-webpack2-starter)
* [@ngrx/example-app](https://github.com/ngrx/example-app)

