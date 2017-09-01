var gulp = require('gulp')
var uglify = require('gulp-uglify')
var rename = require("gulp-rename")

var path = {
  src: {
    js: './src'
  },
  dist: {
    js: './dist'
  }
}

gulp.task('js', function () {
  gulp.src(path.src.js + '/*.js')
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest(path.dist.js))
})

gulp.task("default", function() {
  gulp.run('js')
  gulp.watch(path.src.js + '/*.js', ['js'])
})