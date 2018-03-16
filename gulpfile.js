var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
    watch = require('gulp-watch');
var concat = require('gulp-concat');
//var rename = require('gulp-rename');
//var uglify = require('gulp-uglify');
 
//compile + minify style.less
gulp.task('less', function () {
    return gulp.src('./src/assets/style.less')
      .pipe(less({
        paths: [ path.join(__dirname, 'less', 'includes') ]
      }))
      .pipe(gulp.dest('./src/assets/'));
  });

  gulp.task('watchless', function () {
    return watch('./src/assets/*.less', function () {
        gulp.src('./src/assets/style.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./src/assets/'));
        });
    });


    /* 
    ** plugins.js
    ** angular scripts to concat 
    */
    var angularFiles = [
        './dist/inline.bundle.js',
        './dist/polyfills.bundle.js',
        './dist/styles.bundle.js',
        './dist/vendor.bundle.js',
        './dist/main.bundle.js'
    ],
    angularDest = './dist/';

    gulp.task('angular', function() {
    return gulp.src(angularFiles)
        .pipe(concat('angular.bundle.js'))
        .pipe(gulp.dest(angularDest))
        // .pipe(rename('angular.bundle.min.js')) //to uglify
        // .pipe(uglify()) //to uglify
        // .pipe(gulp.dest(angularDest)); //to uglify
    });


    var vendorFiles = [
        './dist/assets/vendor/jquery-1.12.4.min.js',
        './dist/assets/vendor/detectmobilebrowser.js',
        './dist/assets/vendor/swiper.min.js',
        './dist/assets/vendor/dropdown/core.js',
        './dist/assets/vendor/dropdown/touch.js',
        './dist/assets/vendor/dropdown/dropdown.js',
        './dist/assets/vendor/jquery-scrollLock-master/jquery-scrollLock.min.js'
    ],
    vendorDest = './dist/assets/vendor/';
    gulp.task('vendors', function() {
        return gulp.src(vendorFiles)
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest(vendorDest))
        // .pipe(rename('angular.bundle.min.js')) //to uglify
        // .pipe(uglify()) //to uglify
        // .pipe(gulp.dest(angularDest)); //to uglify
    });

  
gulp.task('default', function() {
  // place code for your default task here
});