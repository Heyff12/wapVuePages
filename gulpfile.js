/**
 * 组件安装
 * npm install gulp-util gulp-imagemin gulp-less gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-livereload tiny-lr gulp-autoprefixer gulp-rev-append gulp-shell amd-optimize fs path browser-sync del --save-dev
 */

// 引入 gulp及组件
var gulp = require("gulp"), //基础库
    del = require("del"), //删除文件
    header = require("gulp-header"), //给文件头部增加特殊内容
    runSequence = require("run-sequence"); //按顺序执行
var toFile = "../../fenqi_portal/bin/"; //待转移到的目录
var file_road = {
    w_cleanall: [
        toFile + "static/{css,fonts,img,js}",
        toFile + "template/*.html"
    ], //删除文件——静态文件（css fonts img js）和html（index_in.html）

    static_src: "./dist/static/{css,fonts,img,js}/**/*", //待复制静态文件
    html_src: "./dist/*.html", //待复制html
    static_dst: toFile + "static", //静态文件-online目录
    html_dst: toFile + "template" //html-online目录
};

// 清空bin目录下的静态文件（css fonts img js）和html（index_in.html）------------------------------------------------------------------------------------------------------------------------------------------
gulp.task("del", function(cb) {
    //不删除图片
    del(file_road.w_cleanall, { force: true }, cb);
});
//文件转移------------------------------------------------------------------------------------------------------------------------------------------
gulp.task("copy_static", function() {
    //复制静态文件到bin/static
    gulp.src(file_road.static_src).pipe(gulp.dest(file_road.static_dst));
});
gulp.task("copy_html", function() {
    //复制到bin/template
    gulp
        .src(file_road.html_src)
        // .pipe(header("# coding: utf-8 \n")) //增加头部代码
        .pipe(gulp.dest(file_road.html_dst));
});

//发布过程中  gulp dev && gulp copy（先删除，再转移）
gulp.task("copy", function(done) {
    runSequence(["copy_static"], ["copy_html"], done);
});
gulp.task("default", ["copy"]);