var gulp = require('gulp');

// Loading Dependencies
var autoprefixer = require('gulp-autoprefixer');
var browser = require('browser-sync');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var watchify = require('watchify');

// Gulp Tasks - Partials
gulp.task('server', function() {
  browser({
    server: {
      baseDir: 'src/'
    }
  });
});

gulp.task('html', function() {
  gulp.src('src/**/*.html')
      .pipe(gulp.dest('src'))
      .pipe(browser.reload({stream:true}))
});

gulp.task('js', function() {
  gulp.src('src/js/**/*.js')
      .pipe(plumber())
      .pipe(uglify())
      .pipe(gulp.dest('src'))
      .pipe(browser.reload({stream:true}))
});

gulp.task('sass', function() {
  gulp.src('src/sass/**/*.scss')
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest('src'))
      .pipe(browser.reload({stream:true}))
});

gulp.task('default', ['server'], function() {
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('dev', ['sass', 'js', 'html', 'default']);
