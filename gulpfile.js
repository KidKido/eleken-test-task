const gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    rigger = require('gulp-rigger'),
    cleancss = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    rimraf = require('rimraf'),
    browserSync = require('browser-sync');

const config = {
    server: {
        baseDir: 'public'
    },
    tunnel: true,
    host: 'localhost',
    port: 9000
};

const path = {
    destination: {
        docs: 'docs/',
        views: 'public/',
        images: 'public/assets/images/',
        styles: 'public/assets/styles/',
        scripts: 'public/assets/scripts/'
    },
    source: {
        docs: 'public/**/*',
        views: 'views/*.html',
        images: 'assets/images/**/*.*',
        styles: 'assets/styles/main.scss',
        scripts: 'assets/scripts/main.js'
    },
    watch: {
        views: 'views/**/*.*',
        images: 'assets/images/**/*.*',
        styles: 'assets/styles/**/*.*',
        scripts: 'assets/scripts/**/*.*'
    },
    clean: ['docs/*', 'public/*']
};

gulp.task('views:build', function () {
    gulp.src(path.source.views)
        .pipe(rigger())
        .pipe(gulp.dest(path.destination.views))
        .pipe(browserSync.stream());
});

gulp.task('images:build', function () {
    gulp.src(path.source.images)
        .pipe(imagemin())
        .pipe(gulp.dest(path.destination.images))
        .pipe(browserSync.stream());
});

gulp.task('styles:build', function () {
    gulp.src(path.source.styles)
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cleancss())
        .pipe(gulp.dest(path.destination.styles))
        .pipe(browserSync.stream());
});

gulp.task('scripts:build', function () {
    gulp.src(path.source.scripts)
        .pipe(rigger())
        .pipe(uglify())
        .pipe(gulp.dest(path.destination.scripts))
        .pipe(browserSync.stream());
});

gulp.task('docs', function () {
    gulp.src(path.source.docs).pipe(gulp.dest(path.destination.docs));
});

gulp.task('clean', function () {
    path.clean.map(function (path) {
        rimraf.sync(path);
    });
});

gulp.task('server', function () {
    browserSync(config);
});

gulp.task('build', [
    'views:build',
    'images:build',
    'styles:build',
    'scripts:build'
]);

gulp.task('watch', function () {
    gulp.watch(path.watch.views, ['views:build']);
    gulp.watch(path.watch.images, ['images:build']);
    gulp.watch(path.watch.styles, ['styles:build']);
    gulp.watch(path.watch.scripts, ['scripts:build']);
});

gulp.task('default', ['build', 'server', 'watch']);
