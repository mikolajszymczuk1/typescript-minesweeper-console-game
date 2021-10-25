const { src, dest, watch } = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const minify = require("gulp-minify");


const SCRIPTS_PATH = "src/**/*.ts";

// DEV
function dev() {
    return src(SCRIPTS_PATH)
        .pipe(tsProject())
        .pipe(dest("dist"));
}

// Production
function build() {
    return src(SCRIPTS_PATH)
        .pipe(tsProject())
        .pipe(minify({
            noSource: true
        }))
        .pipe(dest("dist"));
}

exports.default = function() { watch(SCRIPTS_PATH, dev); }
exports.build = build;
