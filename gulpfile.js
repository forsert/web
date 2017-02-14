var gulp = require('gulp'),
    uglify = require("gulp-uglify"),
    Mincss = require('gulp-minify-css'),
    Concat = require("gulp-concat"),
    Sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    spriter = require('gulp-css-spriter');

var imagemin=require('gulp-imagemin');
var pngquant=require("imagemin-pngquant");
gulp.task('default',function(){
    console.log('成功');
})
//压缩js
gulp.task('minjs', function () {
    gulp.src('js/*.js') 
        .pipe(uglify()) 
        .pipe(gulp.dest('dist/js'));
});
//压缩css
gulp.task('mincss',function(){
    gulp.src('css/*.css')
        .pipe(Mincss())
        .pipe(gulp.dest('dist/css'));
});
//移动html
gulp.task('html',function(){
    gulp.src("*.html")
        .pipe(gulp.dest('dist'));
});
//编译sass
gulp.task('sass', function () {
    gulp.src('sass/*.scss')
        .pipe(Sass())
        .pipe(gulp.dest('css'));
});
//合并js
gulp.task('concatjs',function(){
    gulp.src('js/*.js')
        .pipe(Concat('common.js'))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"));
});
//合并css
gulp.task('concatcss',function(){
    gulp.src('css/*.css')
        .pipe(Concat('common.css'))
        .pipe(Mincss())
        .pipe(gulp.dest("dist/css"));
});

//压缩img
gulp.task('img',function(){
   gulp.src('img/*')
       .pipe(imagemin({
        progressive:true,
        svgoPlugins:[{removeViewBox:false}],
        use:[pngquant()]
       }))
       .pipe(gulp.dest("dist/img")); 
});
//自动刷新
gulp.task('watch',function(){
    browserSync.init({
        server:{
            baseDir:['./']
        }
    });
    gulp.watch('sass/*.scss',['sass']).on('change',browserSync.reload);
    gulp.watch('*.html').on('change',browserSync.reload);
    gulp.watch('js/*.js').on('change',browserSync.reload);
    gulp.watch('css/*.css').on('change',browserSync.reload);
});
//合并雪碧图
gulp.task('speed', function() {
    return gulp.src('css/*.css')
        .pipe(spriter({
            'spriteSheet': 'img/spritesheet.png', 
            'pathToSpriteSheetFromCSS': '../img/spritesheet.png'
        }))
        .pipe(gulp.dest('css'));
});
//打包压缩
gulp.task("bale",['minjs','mincss','html','img']);
//打包压缩
gulp.task("combine",['concatjs','concatcss','html','img']);