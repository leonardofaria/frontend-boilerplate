# Frontend boilerplate

> This is a simple workflow to start new projects, focused in performance.

[![license][license-image]][license-url] [![license][devdependencies-image]][devdependencies-url]

## Features

- [Gulp](http://gulpjs.com/) - Build system
- [Browsersync](http://www.browsersync.io/) - Watch project changes and updates browsers
- [Sass](http://sass-lang.com/) - CSS Preprocessor
- [normalize.css](github.com/necolas/normalize.css) - Normalize all style discrepancies
- [Bootstrap 4](https://github.com/twbs/bootstrap.git) - Flexbox Grid and Utilities class
- [Google Analitycs Lite](https://github.com/jehna/ga-lite/) - CDN Optimized Google Analytics
- [Web Font Loader](https://github.com/typekit/webfontloader) - Improved Google Fonts / Typekit

## Instalation

You will need to install [NodeJS](http://nodejs.org/).

```sh
# Clone the repository:
$ git clone  --recursive git@github.com:leonardofaria/frontend-boilerplate.git
$ cd frontend-boilerplate

# Installs all the dependencies:
$ npm install && npm start

# Starts a local server on port 3000:
$ gulp
```

## Styles

The style structure is initially divided into:

```sass
@import "variables";
@import "bootstrap";
@import "mixins";
```

You probably don't need to use the complete Bootstrap version. The `bootstrap.scss` file specifies which files to import. Here is what is imported:

- `_variables.scss`: variables used by Bootstrap to setup HTML styling
- `_mixins.scss`: mixins that are used by other files
- `_normalize.scss`: [Nicolas Gallagher's normalize.css](http://github.com/necolas/normalize.css)
- `_reboot.scss`: global reset and additional rules on top of normalize.css
- `_grid.scss`: [flexbox grid](http://v4-alpha.getbootstrap.com/layout/flexbox-grid/)
- `_utilities.scss`: [utilities](http://v4-alpha.getbootstrap.com/components/utilities/) classes

The `mixins.scss` contains an image-replacement mixin.

## Tasks

- `gulp serve`: start local server
- `gulp css`: compile sass, auto-prefix, write sourcemap, minify CSS
- `gulp lint:css`: lint css according to `.stylelintrc` file
- `gulp js`: concat and minify JS
- `gulp deploy:github`: create a gh-pages branch with `public` directory content
- `gulp rsync`: sync the `public` directory content via SSH

## Todo

- [ ] Rewrite the `gulpfile.js` in a ES6 format (or replace to NPM scripts)
- [ ] Finish the stylelint settings
- [ ] Add a JS linter

## Maintainer

- Leonardo Faria - <http://leonardofaria.net>

## Contributing

Once you've made your great commits:

1. [Fork](http://help.github.com/forking/) 
2. Create a branch with a clear name
3. Make your changes (Please also add/change spec, README and CHANGELOG if applicable)
4. Push changes to the created branch
5. Create an Pull Request

## License

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[license-image]: https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square
[license-url]: #license
[devdependencies-image]: https://david-dm.org/leonardofaria/frontend-boilerplate/dev-status.svg?style=flat-square
[devdependencies-url]: https://david-dm.org/leonardofaria/frontend-boilerplate#info=devDependencies