var gulp = require('gulp'), 
    sass = require('gulp-ruby-sass') ,
    notify = require("gulp-notify") ,
    uglify = require('gulp-uglifyjs'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    rsync = require('rsyncwrapper').rsync;

var config = {
  sassPath: './resources/sass',
  jsPath: './resources/js',
   supportforDir: './node_modules/support-for/sass' ,
   normalizeDir: './node_modules/normalize-scss/sass' ,
};

gulp.task('rsync', function() {
  rsync({
    src: './public/',
    ssh: true,
    dest: 'user@server:~/path/to/folder',
    port: 22,
    recursive: true,
    deleteAll: true,
    exclude: ['.DS_Store'],
    args: [ '--verbose' ]
  }, function(error, stdout, stderr, cmd) {
    console.log('error: ' + error);
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
  });
});

gulp.task('server', function() {
  browserSync({
    server: {
      baseDir: 'public'
    }
  });
});

gulp.task('js', function () {
  gulp.src([config.jsPath + '/app.js'])
  .pipe(uglify('app.js', {
    mangle: false,
    output: {
      beautify: true
    }
  }))
  .pipe(gulp.dest('./public/js'))
});

gulp.task('css', function() { 
  return gulp.src(config.sassPath + '/style.scss')
    .pipe(sass({
      style: 'compressed',
      loadPath: [
          './resources/sass',
          config.supportforDir,
          config.normalizeDir,
      ]
    })
    .on("error", notify.onError(function (error) {
        return "Error: " + error.message;
    })))
    .pipe(gulp.dest('./public/css'));
});

 gulp.task('watch', function() {
  gulp.watch(config.sassPath + '/**/*.scss', ['css', browserSync.reload]); 
  gulp.watch(config.jsPath + '/**/*.js', ['js', browserSync.reload]); 
});

  gulp.task('default', ['server', 'watch']);
