var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src('public/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest("public/styles"))
        .pipe(browserSync.stream());
});



// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {

    browserSync.init({
        server: "./"  
    });

    gulp.watch('public/scss/*.scss', gulp.series('sass'));
    gulp.watch("/views/pages/auth/signup.ejs").on('change', browserSync.reload);
}));

gulp.task('default', gulp.parallel('serve','sass'));