/* jshint node: true */
// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
/*
        Fine Uploader
        -------------

        Gruntfile
 */
module.exports = function(grunt) {
    "use strict";

    require("time-grunt")(grunt);

    var async, configs, fs, name, path, paths, pkg, tasks, utils, uuid;

    fs = require("fs");
    uuid = require("uuid");
    async = require("async");
    utils = require("./lib/grunt/utils");
    configs = require("./lib/grunt/configs");
    tasks = "./lib/grunt/tasks";
    path = require("path");
    pkg = require("./package.json");
    paths = {
        commonJs: "./lib/commonJs",
        dist: path.join("./_dist", pkg.version),
        build: "./_build",
        src: "./client",
        html: "./client/html/templates",
        docs: "./docs"
    };
    grunt.initConfig({
        pkg: pkg,
        paths: paths,
        compress: configs.compress(paths),
        concat: configs.concat(paths),
        copy: configs.copy(paths),
        cssmin: configs.cssmin(paths),
        aws_s3: configs.s3(paths.dist, paths.build, pkg.version),
        shell: configs.shell(paths),
        strip_code: configs.stripcode(paths),
        uglify: configs.uglify(paths),
        usebanner: configs.banner(paths),
        version: configs.version(pkg),
        watch: configs.watch(paths)
    });

    for (name in pkg.devDependencies) {
        if (name.substring(0, 6) === "grunt-") {
            grunt.loadNpmTasks(name);
        }
    }

    grunt.loadTasks(tasks);

};
