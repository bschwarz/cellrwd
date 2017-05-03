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
                files: ['css/style.css'],
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
          }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('build', ['cssmin', 'ngAnnotate']);
    grunt.registerTask('server', ['connect']);
    grunt.registerTask('test', ['build', 'karma']);
};
