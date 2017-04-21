## Simple Angular 2 Starter

## !!!DEPRECATED!!! You should use [Angular CLI](http://github.com/angular/angular-cli/) now.

Tired of complicated starters with 300MB of dependencies which are hard to understand and modify?

Try this simple well-commented starter with minimum dependencies.

I made it for myself to set up a clean well-understandable build process which will build
small release app, while allowing fast iterations with HMR (hot module reload).

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

### AOT Don'ts

According to [angular-webpack2-starter](https://github.com/qdouble/angular-webpack2-starter), the  following things will make AOT compilation fail:

- Don’t use require statements for your templates or styles, use styleUrls and templateUrls, the angular2-template-loader plugin will change it to require at build time.
- Don’t use default exports.
- Don’t use form.controls.controlName, use form.get(‘controlName’)
- Don’t use control.errors?.someError, use control.hasError(‘someError’)
- Don’t use functions in your providers, routes or declarations, export a function and then reference that function name
- Inputs, Outputs, View or Content Child(ren), Hostbindings, and any field you use from the template or annotate for Angular should be public

### Nginx Config

Here is an example Nginx config:
```
server {
	# ... root and other options

	gzip on;
	gzip_http_version 1.1;
	gzip_types text/plain text/css text/xml application/javascript image/svg+xml;

	location / {
		try_files $uri /index.html;
	}

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

Inspired by these starters:

* [@preboot/angular2-webpack](https://github.com/preboot/angular2-webpack)
* [@qdouble/angular-webpack2-starter](https://github.com/qdouble/angular-webpack2-starter)

