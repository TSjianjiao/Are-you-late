const gulp = require('gulp')
const path = require('path')
const through = require('through2')
const typescript = require('gulp-typescript')
const del = require('del')
const bump = require('gulp-bump')
const watch = require('gulp-watch')
const shell = require('gulp-shell')
const alias = require('@gulp-plugin/alias')

const tsProject = typescript.createProject('tsconfig.production.json')

const cleanLib = () => {
  return del([
    'lib',
    'build'
  ])
}

const watchTS = () => {
  return watch('src/**/*', shell.task('npx webpack'))
}

function compile() {
  const compiled = gulp.src('./src/**/*.ts')
    .pipe(alias(tsProject.config))
    .pipe(tsProject());

  return compiled.js
    .pipe(gulp.dest('build/'))
}

// 构建
// const compile = shell.task('npx tsc  -p tsconfig.production.json')
const build = gulp.series([cleanLib, compile])

module.exports = {
  cleanLib,
  watchTS,
  build,
}
