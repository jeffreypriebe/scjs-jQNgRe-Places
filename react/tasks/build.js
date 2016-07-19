'use strict';

var gulp = require('gulp'),
	gutil = require('gulp-util'),
	del = require('del'), 
	webpack = require('webpack'),
    webpackConfig = require("../webpack.config.js");

const destPath = 'dist/';

gulp.task('build', function(cb) {
	var config = Object.create(webpackConfig);

    // config.devtool = '#cheap-source-map';

    config.output  = {
        path: destPath + '/__build__',
        filename: '[name]',
        chunkFilename: '[id].chunk.js',
        publicPath: destPath + '/__build__/'
    }

    config.plugins = config.plugins || [];
    // config.plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));

	// run webpack
	webpack(config, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build", err);
		gutil.log("[webpack:build]", stats.toString({
			colors: true
		}));
		cb();
	});
});

gulp.task('clean', function() {
	return del(['dist/*']);
});