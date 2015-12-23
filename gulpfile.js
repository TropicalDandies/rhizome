var gulp = require('gulp');

// Loading Dependencies
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var browser = require('browser-sync');
var connect = require('gulp-connect');
var del = require('del');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var watchify = require('watchify');

// config variables
var isDev = false;
var isProduction = false;
var copyLocations = [
  {
    src: './src/assets/**/*.*',
    dest: './public/assets'
  },
  {
    src: './src/index.html',
    dest: './public'
  }
];

var watchLocations = {
  sass: ['./src/sass/**/*.scss', '!./src/sass/partials']
  // js: ''
};

var destLocations = {
  sass: './public'
};

// error handling
var onError = function(err) {
  gutil.log(gutil.colors.red('ERROR', err.plugin), err.message);
  gutil.beep();
  new gutil.PluginError(err.plugin, err, {showStack: true});
  // this.emit('end');
};

// ////////////////////////////////////////////////
// CLEAN
// ////////////////////////////////////////////////
gulp.task('clean', function(cb) {
  del(['public/**/*'], cb);
});

// ////////////////////////////////////////////////
// COPY
// ////////////////////////////////////////////////
gulp.task('copy', function(cb) {
  var task;
  for (var i = 0; i < copyLocations.length; i++) {
    task = gulp.src(copyLocations[i].src)
    .pipe(plumber())
    .pipe(watch(copyLocations[i].src))
    .pipe(gulp.dest(copyLocations[i].dest))
    .pipe(connect.reload());
  }

  cb();
});

// ////////////////////////////////////////////////
// BROWSERIFY/WATCHIFY
// ////////////////////////////////////////////////
var bundler = browserify({
  basedir: 'src/js/',
  entries: ['index.js'],
  debug: isDev
  // })
  // .transform(ngHtml2Js({
  // module: 'templates',
  // extension: 'html'
  // baseDir: './src/js/components/navbar'
  // })
});

gulp.task('js', function() {
  return bundler.bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(gulpif(isDev, sourcemaps.init({loadMaps: true})))
  .pipe(gulpif(isDev, sourcemaps.write()))
  .pipe(gulp.dest('./public/js'))
  .pipe(connect.reload());
});

gulp.task('watchify', function() {
  var watcher = watchify(bundler);
  return watcher
  .on('error', gutil.log.bind(gutil, 'Browserify Error'))
  .on('update', function() {
    watcher.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/js'))
    .pipe(connect.reload());

    gutil.log('Updated Javascript sources');
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./public/js'));
});

// ////////////////////////////////////////////////
// SASS
// ////////////////////////////////////////////////
// Based on http://gotofritz.net/blog/geekery/how-to-prevent-sass-errors-stopping-gulp-watch/
gulp.task('sass', function() {
  gulp.src('src/sass/**/*.scss')
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest('./public'))
      .pipe(browser.reload({stream:true}));
});

gulp.task('sass:watch', function() {
  watch(watchLocations.sass, function() {
    gulp.start('sass');
  });
});

// ////////////////////////////////////////////////
// SERVER
// ////////////////////////////////////////////////
gulp.task('server', function() {
  connect.server({
    root: 'public',
    port: 5050,
    livereload: true
  });
});

// ////////////////////////////////////////////////
// CONFIG TASKS
// ////////////////////////////////////////////////
gulp.task('config:dev', function() {
  // TODO add gulpif to dev-based tasks like sourcemaps
  isDev = true;
  return;
});

// ////////////////////////////////////////////////
// MAIN TASKS
// ////////////////////////////////////////////////
gulp.task('dev', ['config:dev', 'clean'], function() {
  gulp.start('copy');
  gulp.start('sass');
  gulp.start('sass:watch');
  gulp.start('watchify');
  gulp.start('server');
});
