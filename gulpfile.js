var gulp = require('gulp');
var run  = require('gulp-run');
var os   =  require('os');

gulp.task('run', function() {
	var cmd = './electron .';
	
	if (os.type() === 'Windows_NT') {
		cmd = 'electron.cmd .';
	}
	
	return run(cmd).exec();
});