module.exports = function(grunt) {
    grunt.initConfig({
        // pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    port: 8080,
                    base: './',
                    keepalive: true
                }
            }
        },
        cssmin: {
            minify: {
                src: 'css/style.css',
                expand: true,
                ext: '.min.css'
            }
        },
        watch: {
            project: {
                files: ['scripts/application.js', 'css/style.css'],
                tasks: ['build'],
                options: {
                    livereload: {
                        port: 9000
                    }
                }
            }
        },
        ngAnnotate: {
            options: {
              singleQuotes: true
            },
            mobileWebApp: {
                files: {
                    'scripts/application.annotated.js':['scripts/application.js']
                }
            }
          },
        uglify: {
            project: {
                files: {
                    'scripts/application.min.js':'scripts/application.annotated.js'
                }
            }
        },
        'string-replace': {
                dev: {
                    files: {
                      'index.html': 'index.tpl.html'
                    },
                    options: {
                      replacements: [
                      {
                        pattern: '<script src="APPLICATION">',
                        replacement: '<script src="scripts/application.js">'
                      }
                      ]
                    }
                },
                prod: {
                    files: {
                      'index.html': 'index.tpl.html'
                    },
                    options: {
                      replacements: [
                      {
                        pattern: '<script src="APPLICATION">',
                        replacement: '<script src="scripts/application.min.js">'
                      }
                      ]
                    }
                },
        },
        copy: {
            main: {
                files: [
                    {
                        cwd: 'scripts/vendor/',
                        filter: 'isFile',
                        expand: true,
                        flatten: true,
                        src: ['*/*.min.js'],
                        dest: 'dist/js'
                    },
                    {
                        cwd: 'scripts/vendor/',
                        filter: 'isFile',
                        expand: true,
                        flatten: true,
                        src: ['*/dist/*.min.js'],
                        dest: 'dist/js'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');

    var target = grunt.option('target') || 'dev';
    grunt.registerTask('build', ['cssmin', 'ngAnnotate', 'uglify', 'string-replace:' + target]);
    grunt.registerTask('server', ['connect']);
    grunt.registerTask('cp', ['copy']);
    grunt.registerTask('test', ['build', 'karma']);
};
