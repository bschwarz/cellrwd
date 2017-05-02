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
        concat: {
            basic: {
              src: ['scripts/application.js'],
              dest: 'dist/app.js',
            },
          }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('build', ['cssmin']);
    grunt.registerTask('server', ['connect']);
    grunt.registerTask('test', ['build', 'karma']);
};
