'use strict';

const cp = require('child_process');
const fs = require('fs-extra');
const gulp = require('gulp');
const path = require('path');

const pluginFiles = {
    'canvas-confetti/dist/confetti.browser.js': '.'
};

function clean() {
    return fs.emptyDir('./_site');
}

function copyJs(src, dest) {
    return gulp
        .src(path.join('./node_modules', src))
        .pipe(gulp.dest(path.join('./_site/assets/plugins', dest)));
}

const loadPluginJs = gulp.parallel.apply(
    null, Object.entries(pluginFiles).map(e => copyJs.bind(null, ...e)));

function jekyll() {
    return cp.spawn('bundle', ['exec', 'jekyll', 'build'], { stdio: 'inherit' });
}

const build = gulp.series(clean, loadPluginJs, jekyll);

exports.default = build;