var gulp =         require('gulp'),
    precss=        require('precss'),
    postcss =      require('gulp-postcss'),
    rename=        require('gulp-rename'),
    autoprefixer=  require('autoprefixer'),
    browserSync=   require('browser-sync'),
    concat=        require('gulp-concat'),
    uglify=        require('gulp-uglify'),
    imagemin=      require('gulp-imagemin'),
    magican=  require('postcss-font-magician');

    //SCRIPTS
    gulp.task('scripts', function() {
    	return gulp.src([
    		'app/libs/jquery/dist/jquery.min.js',
    		'app/js/common.js', // Всегда в конце
    		])
    	.pipe(concat('scripts.min.js'))
    	.pipe(uglify())
    	.pipe(gulp.dest('app/js'))
    	.pipe(browserSync.reload({stream: true}));
    });

    gulp.task('browser-sync', function() {
    	browserSync({
    		server: {
    			baseDir: "./app"
    		},
    		notify: false
    	});
    });

    //IMAGE
    gulp.task('imagemin', function() {
    	return gulp.src('app/img/**/*')
    	.pipe(cache(imagemin()))
    	.pipe(gulp.dest('dist/img'));
    });


    //STYLE
    gulp.task('style', function () {
      var plugins = [
        precss({ /* options */ }),
        magican({
                 variants: {
                'Open Sans': {
                    '300': ['woff, eot, woff2'],
                    '400 italic': ['woff2']
                }
            }
        }),
        autoprefixer({browsers: ['last 5 version']})
         ];
        return gulp.src('app/src/style.css')
            .pipe(postcss(plugins, { parser: require('postcss-scss')}))
            .pipe(gulp.dest('app/css'))
            .pipe(browserSync.reload({stream: true}));
    });

    //WATCH
    gulp.task('watch', ['style', 'scripts', 'browser-sync'], function() {
    	gulp.watch('app/src/**/*.css', ['style']);
    	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['scripts']);
    	gulp.watch('app/*.html', browserSync.reload);
    });


    gulp.task('default', ['watch']);
