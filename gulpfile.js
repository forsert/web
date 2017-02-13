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
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({
            stream:true
        }));
});
//压缩css
gulp.task('mincss',function(){
    gulp.src('css/*.css')
        .pipe(Mincss())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream:true
        }));
});
//移动html
gulp.task('html',function(){
    gulp.src("*.html")
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream:true
        }));
});
//编译sass
gulp.task('sass', function () {
    gulp.src('sass/*.scss')
        .pipe(Sass())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream:true
        }));
});
//合并js
gulp.task('concatjs',function(){
    gulp.src('js/*.js')
        .pipe(Concat('index.js'))
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.reload({
            stream:true
        }));
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
//监控修改记录
gulp.task('watch',function(){
    browserSync.init({
        server:{
            baseDir:['./']
        }
    });
    gulp.watch('sass/*.scss',['sass']);
    gulp.watch('css/*.css',['mincss']);
    gulp.watch('*.html',['html']);
    gulp.watch('js/*.js',['minjs']);
});
//合并雪碧图
gulp.task('speed', function() {
    return gulp.src('css/*.css')
        .pipe(spriter({
            'spriteSheet': 'img/spritesheet.png', 
            'pathToSpriteSheetFromCSS': '../img/spritesheet.png'
        }))
        .pipe(gulp.dest('/css'));
});