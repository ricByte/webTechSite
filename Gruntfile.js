'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: [
            'public',
            '.sass-cache'
        ],
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'public/dist/css/application.css': 'modules/app/scss/style.scss'
                }
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            }
        },
        concat: {
            dist: {
                src: [
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/jquery.cookie/jquery.cookie.js',
                    'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
                    'public/dist/js/min-safe/app-annotated.js'
                ],
                dest: 'public/dist/js/application.js'
            }
        },
        shell: {
            pythonServer: {
                options: {
                    stdout: true
                },
                command: 'python -m SimpleHTTPServer'
            }
        },
        concurrent: {
            default: ['shell', 'watch'],
            options: {
                logConcurrentOutput: true,
                limit: 4
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: {
                files: {
                    'public/dist/js/min-safe/app-annotated.js': 'modules/**/*.js',
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.registerTask('default', ['clean', 'sass', 'ngAnnotate','concat', 'concurrent']);
};