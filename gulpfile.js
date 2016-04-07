"use strict";

var gulp = require("gulp"),
  sass = require("gulp-sass"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  csscomb = require("gulp-csscomb"),
  minifyCss = require("gulp-minify-css"),
  rename = require("gulp-rename"),
  imagemin = require("gulp-imagemin"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  replace = require("gulp-replace"),
  runSequence = require("run-sequence"),
  rigger = require("gulp-rigger"),
  browserSync = require("browser-sync"),
  combineMq = require("gulp-combine-mq"),
  reload = browserSync.reload,
  del = require("del");

var path = {
  build: {
    css: "dist/css",
    html: "dist",
    fonts: "dist/fonts",
    js: "dist/js",
    img: "dist/img"
  },

  src: {
    styles: {
      sassFolder: "source/sass/**/*.*",
      sass: "source/sass/style.scss"
    },

    html: "source/*.html",
    fonts: "source/fonts/**/*.*",
    img: "source/img/**/*.*",
    scripts: {
      jsFolder: "source/js/",
      js: "source/js/*.js"
    }
  }
};

gulp.task("build:style", function () {
  return gulp.src(path.src.styles.sass)
    .pipe(sass({outputStyle: "expanded"}).on("error", sass.logError))
    .pipe(postcss([autoprefixer({browsers: ["last 4 versions"]})]))
    .pipe(csscomb())
    .pipe(combineMq())
    // .pipe(gulp.dest(path.build.css))
    // .pipe(minifyCss({keepSpecialComments: 0}))
    // .pipe(rename({ suffix: ".min"}))
    .pipe(gulp.dest(path.build.css))
});

gulp.task("style", function () {
  return gulp.src(path.src.styles.sass)
    .pipe(sass({outputStyle: "expanded"}).on("error", sass.logError))
    .pipe(postcss([autoprefixer({browsers: ["last 4 versions"]})]))
    .pipe(csscomb())
    .pipe(combineMq())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({
      stream: true
    }))
});

gulp.task("html", function () {
  return gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({
      stream: true
    }))
});

gulp.task("build:html", function () {
  return gulp.src(path.src.html)
    .pipe(rigger())
    // .pipe(replace("css/stub-style.css", "css/stub-style.min.css"))
    // .pipe(replace("css/style.css", "css/style.min.css"))
    // .pipe(replace("js/script.js", "js/all.min.js"))
    .pipe(replace("js/script.js", "js/all.js"))
    .pipe(replace(/\s*<script.*js\/(?!all.js).*<\/script>/g, ""))
    .pipe(gulp.dest(path.build.html))
});

gulp.task("fonts", function () {
  return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
    .pipe(reload({
      stream: true
    }))
});

gulp.task("img", function () {
  return gulp.src(path.src.img)
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({
      stream: true
    }))
});

gulp.task("build:images", function () {
  return gulp.src(path.src.img)
    .pipe(imagemin({
      progressive: true,
      optimizationLevel: 3,
      svgoPlugins: [{cleanupIDs: false}],
      multipass: true
    }))
    .pipe(gulp.dest(path.build.img))
});

gulp.task("js", function () {
  return gulp.src(path.src.scripts.js)
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({
      stream: true
    }))
});

gulp.task("build:js", function () {
  return gulp.src([
      path.src.scripts.jsFolder + "jquery.min.js",
      path.src.scripts.jsFolder + "slick.min.js",
      path.src.scripts.js
    ])
    // .pipe(uglify())
    .pipe(concat("all.js", {newLine: ";"}))
    .pipe(gulp.dest(path.build.js))
});

gulp.task("clean", function () {
  return del([path.build.html])
});

gulp.task("build", function () {
  runSequence(
    "clean",
    [
      "build:style",
      "build:js",
      "build:html",
      "build:images",
      "fonts"
    ]
  );
});

gulp.task("server", function () {
  browserSync({
    server: {
      baseDir: "./dist/"
    },
    logLevel: "info",
    open: false,
    ghostMode: false,
    notify: false,
    injectChanges: true,
    codeSync: true,
    reloadDelay: 500
  });
});

gulp.task("watch", function () {
  gulp.watch(path.src.styles.sassFolder, ["style"]);
  gulp.watch(path.src.html, ["html"]);
  gulp.watch(path.src.fonts, ["fonts"]);
  gulp.watch(path.src.img, ["img"]);
  gulp.watch(path.src.scripts.js, ["js"]);
});

gulp.task("default", function() {
  runSequence(
    "clean",
    [
      "style",
      "html",
      "fonts",
      "img",
      "server",
      "js",
      "watch"
    ]
  );
});
