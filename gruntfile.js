module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    'dev/styles/main.css': 'src/styles/main.less'
                }
            },
            production: {
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development']
            },
            html: {
                files: ['dev/index.html'],
                tasks: ['replace:dev']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: '@@ENDERECO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: '@@ENDERECO_DO_JS',
                            replacement: '../src/script/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['dev/index.html'], 
                        dest: 'dev/' 
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: '@@ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css' 
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['probuild/index.html'],
                        dest: 'dist/' 
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'dev/index.html' // saída minificada para dist
                }
            }
        },
        clean: {
            build: {
                src: ['prebuild/']
            }
        },
        uglify: {
            target: {
                files: {
                    'dist/script/main.min.js': 'src/script/min.js'
                }
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: 'src/',
                src: ['**'],
                dest: 'dist/'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['clean:build', 'less:production', 'htmlmin:dist', 'replace:dist', 'uglify', 'copy']);
};
