var gulp = require('gulp'), 
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano'),
    gulpFilter = require('gulp-filter'),
    notify = require("gulp-notify") ,
    sass = require('gulp-ruby-sass') ,
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglifyjs'),
    util = require('gulp-util'),
    browserSync = require('browser-sync').create(),
    rsync = require('rsyncwrapper').rsync;

var config = {
  cssPath: './resources/sass',
   jsPath: './resources/js',
  dest: './public'
};

// inspired by https://github.com/mikaelbr/gulp-notify/issues/81
var reportError = function (error) {
  var lineNumber = (error.lineNumber) ? 'LINE ' + error.lineNumber + ' -- ' : '';

  notify({
    title: 'Task Failed [' + error.plugin + ']',
    message: lineNumber + "\n" + error.message,
    sound: 'Glass' // all sounds: http://bit.ly/1XLJkJ3
  }).write(error);

  var report = '';
  var chalk = util.colors.white.bgRed;

  report += chalk('TASK:') + ' [' + error.plugin + ']\n';
  report += chalk('PROB:') + ' ' + error.message + '\n';
  if (error.lineNumber) { report += chalk('LINE:') + ' ' + error.lineNumber + '\n'; }
  if (error.fileName)   { report += chalk('FILE:') + ' ' + error.fileName + '\n'; }
  console.error(report);

  // Prevent the 'watch' task from stopping
  this.emit('end');
}

gulp.task('rsync', function() {
  rsync({
    src: config.dest,
    ssh: true,
    dest: 'user@server:~/path/to/folder',
    port: 22,
    recursive: true,
    deleteAll: true,
    exclude: ['.DS_Store'],
    args: [ '--verbose' ],
  }, function(error, stdout, stderr, cmd) {
    if (error) {
      var report = '';
      var chalk = util.colors.white.bgRed;

      report += chalk('CMD:') + " " + cmd + "\n"
      report += chalk('ERROR:') + " " + error + "\n"
      report += chalk('STDERR:') + " " + stderr + "\n"
      console.error(report)
    } else {
      console.log(stdout);
    }
  })
});

gulp.task('serve', function() {
  browserSync.init({
    // uncomment the next line if you have already a webserver
    // proxy: "http://127.0.0.1",
    // serving files from public folder
    server: {
      baseDir: 'public'
    }
  });
});

gulp.task('js', function () {
  return gulp.src([
      config.jsPath + '/*js',
      // you can also specifify the files in a particular order
      // config.jsPath + '/app.js'
    ])
    .pipe(uglify())
    .pipe(concat({ path: 'app.js' }))
    .pipe(gulp.dest(config.dest + '/js'));
});

gulp.task('css', function() { 
  // prevent reading sourcemaps to autoprefix them or make sourcemaps of sourcemaps
  var filter = gulpFilter(['*.css', '!*.map'], { restore: true });

  return gulp.src(config.cssPath + '/style.scss')
    .pipe(sass())
    .on('error', reportError)
    .pipe(filter)
    .pipe(autoprefixer({ cascade: true}))
    .pipe(sourcemaps.init())
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(filter.restore)
    .pipe(gulp.dest(config.dest + '/css'));
});

 gulp.task('watch', function() {
  // in a php project the next line should be useful
  // gulp.watch(config.themePath + '/**/*.php').on('change', browserSync.reload);
  gulp.watch(config.cssPath + '/**/*.scss', ['css', browserSync.reload]); 
  gulp.watch(config.jsPath + '/**/*.js', ['js', browserSync.reload]); 
});

  gulp.task('default', ['serve', 'watch']);
