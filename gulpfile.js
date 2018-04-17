const gulp = require('gulp');
const builder = require('@messageflow/build').builder({ ignores: ['test*'] });

gulp.task('lint', builder.lint);
gulp.task('default', builder.default);
