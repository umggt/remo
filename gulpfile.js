var gulp = require('gulp');
var run  = require('gulp-run');

gulp.task('run', function() {
	return run('./electron .').exec();
});