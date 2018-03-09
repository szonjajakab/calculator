const gulp = require('gulp');
const del = require('del');
const babel = require('gulp-babel');

gulp.task('clean',  () => {
    return del.sync(['public/**/*']);
});

gulp.task('build', () => {
    gulp.src(['**/*', '!**/*.js'], { base: './src' }).pipe(gulp.dest('public'));
    gulp.src('src/**/*.js', { base: './src' }).pipe(babel()).pipe(gulp.dest('public'));
});

gulp.task('default', ['clean', 'build']);
