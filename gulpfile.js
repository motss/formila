const { writeFile } = require('fs');
const gulp = require('gulp');
const CleanCss = require('clean-css');
const vinylMap = require('vinyl-map');
const builder = require('@messageflow/build').builder({ ignores: ['test*'] });

function minifyCss(buff, filename) {
  return new CleanCss({
    level: 2,
  })
    .minify(buff.toString())
    .styles;
}

gulp.task('css', () => {
  return gulp.src([
    'src/*.css',
  ])
    .pipe(vinylMap(minifyCss))
    .pipe(gulp.dest('dist'));
});
gulp.task('demo', () => {
  return gulp.src([
    'src/demo/*.js',
    'src/demo/*.mjs',
  ])
    .pipe(gulp.dest('dist/demo'));
});
gulp.task('lint', builder.lint);
gulp.task('default', gulp.series(...[builder.clean, builder.lint, builder.ts, 'css']));
