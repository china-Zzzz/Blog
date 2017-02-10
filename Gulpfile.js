var gulp = require('gulp');
var concat = require('gulp-concat');                            //- 多个文件合并为一个；
var minifyCss = require('gulp-minify-css');                     //- 压缩CSS为一行；
var rev = require('gulp-rev');                                  //- 对文件名加MD5后缀
var revCollector = require('gulp-rev-collector');               //- 路径替换
var rename = require('gulp-rename');                            // 文件重命名
var watch = require('gulp-watch');
var clean = require('gulp-clean');                              //清理文件


var srcdir = "src/main/webapp/src"; //源文件（开发）
var destdir = "src/main/webapp/dist"; //发布文件
var revManifestDir = srcdir + "/rev"; //静态文件映射表存储路径
var destTplDir = "src/main/webapp/WEB-INF/views";
//js（生产）
gulp.task("prod.js", function() {
    return gulp.src([srcdir + "/js/*/*.js"], {
            base: srcdir + "/js"
        })
        .pipe(jshint())
        .pipe(jshint.reporter("default", {
            verbose: true
        }))
        .pipe(replace("src/images", "dist/images"))
        .pipe(uglify())
        .pipe(rev())
        .pipe(rename(function(path) {
            path.basename += ".min";
        }))
        .pipe(gulp.dest(destdir + "/js"))
        .pipe(rev.manifest("rev-manifest-js.json", {
            merge: true
        }))
        .pipe(gulp.dest(revManifestDir + "/js"));
});

gulp.task('concat', function() {                                //- 创建一个名为 concat 的 task
    gulp.src(['./src/css/*.css'])                               //- 需要处理的css文件，放到一个字符串数组里
        //.pipe(concat('wrap.min.css'))                         //- 合并后的文件名
        .pipe(minifyCss())                                      //- 压缩处理成一行
        .pipe(rev())                                            //- 文件名加MD5后缀
        .pipe(gulp.dest('./dist/css'))                               //- 输出文件本地
        .pipe(rev.manifest())                                   //- 生成一个rev-manifest.json
        .pipe(gulp.dest('./rev'));                              //- 将 rev-manifest.json 保存到 rev 目录内
});

gulp.task('rev', function() {
    gulp.src(['./rev/*.json', './src/*.html'])                  //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revCollector())                                   //- 执行文件内css名的替换
        .pipe(gulp.dest('./'));                                 //- 替换后的文件输出的目录
});
gulp.task('clean-scripts', function () {
  return gulp.src('./dist/css/*.css', {read: false})
    .pipe(clean());
});

gulp.task('default', ['concat', 'rev', 'clean-scripts']);
//监听任务
gulp.task('watch', function() {
    watch('./src/css/*', function() {
        gulp.run('default');
    });

});
