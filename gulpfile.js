const {
  src,
  dest,
  series,
  watch,
} = require('gulp');
const sass = require('gulp-sass');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const del = require('del');
const sync = require('browser-sync').create();
const { exec } = require('child_process');

function clean() {
  return del('dist');
}

function generateHTML() {
  // convert ejs templates to html using streams
  return src('src/views/main.ejs')
    .pipe(ejs({ title: 'Pinball game made with p5.js and planck.js' }))
    .pipe(rename({ basename: 'index', extname: '.html' }))
    .pipe(dest('dist'))
    .on('end', sync.reload);
}

function generateCSS() {
  // convert sass to css using streams
  return src('src/scss/style.scss')
    .pipe(sass())
    .pipe(dest('dist'))
    .on('end', sync.reload);
}

function generateJS() {
  // bundle main js file & its imports using child process
  return exec('npx rollup -c')
    .on('exit', sync.reload);
}

function watchFiles() {
  sync.init({
    server: {
      baseDir: './dist/',
      index: 'index.html',
    },
  });

  watch('src/views/*.ejs', { ignoreInitial: true }, generateHTML);
  watch('src/scss/*.scss', { ignoreInitial: true }, generateCSS);
  watch('src/**/*.js', { ignoreInitial: true }, generateJS);
}

module.exports = {
  watch: watchFiles,
  build: series(generateHTML, generateCSS, generateJS),
};
