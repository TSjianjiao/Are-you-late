const gulp = require('gulp')
const path = require('path')
const through = require('through2')
const ts = require('gulp-typescript')
const del = require('del')
const bump = require('gulp-bump')
const watch = require('gulp-watch')
const shell = require('gulp-shell')


const cleanLib = () => {
  return del([
    'lib',
  ])
}

const watchTS = () => {
  return watch('src/**/*', shell.task('npx webpack'))
}

// 构建
const compile = shell.task('npx tsc')
const build = gulp.series([cleanLib, compile])

module.exports = {
  cleanLib,
  watchTS,
  build,
}
