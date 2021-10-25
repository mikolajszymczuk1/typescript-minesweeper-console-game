const { src, dest, watch } = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const minify = require("gulp-minify");

// DEV
function dev() {
    return src("src/ts/**/*.ts")
        .pipe(tsProject())
        .pipe(dest("build"));
}

// Production
function build() {
    return src("src/ts/*.ts")
        .pipe(tsProject())
        .pipe(minify({
            noSource: true
        }))
        .pipe(dest("build"));
}

exports.default = function() { watch("src/ts/**/*.ts", dev); }
exports.build = build;
