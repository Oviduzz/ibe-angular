module.exports = function (grunt){

    grunt.initConfig({
        jade: {
            compile: {
                options: {
                    client: false,
                    pretty: true
                },
                files: [
                    {
                        cwd: 'src/jade',
                        src: '**/*.jade',
                        dest: 'app',
                        expand: true,
                        ext: '.html'
                    }
                ]
            }
        },
        sass: {
            dist: {
                files: {
                    'app/css/main.css': 'src/sass/main.sass'
                }
            }
        },
        watch: {
            jade: {
                files: [
                    'src/**/*.html',
                    'src/**/*.jade'
                ],
                tasks: ['jade']
            },
            uglify: {
                files: [
                    'src/js/app.js',
                    'src/js/**/*.js',
                ],
                tasks: ['uglify']
            },
            sass: {
                files: ['src/css/*.scss'],
                tasks: ['sass']
            }
        },
        uglify: {
            my_target: {
                files: {
                    'app/js/main.min.js': 'src/js/index.js'
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 2222,
                    protocol: 'http',
                    base: 'app',
                    debug: false
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('default', ['jade', 'sass', 'uglify', 'connect', 'watch']);
};