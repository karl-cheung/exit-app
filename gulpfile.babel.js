const gulp = require('gulp')
const del = require('del')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')

gulp.task('del', () => del(['exit-app.min.js']))

gulp.task('default', ['del'], () => {
  return gulp.src('./exit-app.js')
    .pipe(uglify({
      output: {
        comments: 'some'
      }
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./'))
})
