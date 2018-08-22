module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-package-modules');
  grunt.loadNpmTasks('grunt-tslint');
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-run');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    clean: ["dist"],

    copy: {
      main: {
        cwd: 'src',
        expand: true,
        src: ['**/*', '!**/*.jsxxx', '!**/*.ts', '!**/*.ts.d', '!**/*.scss'],
        dest: 'dist'
      },
      bower: {
        cwd: 'bower_components',
        expand: true,
        src: [
          '**/angular/*',
          '**/angular-animate/*',
          '**/angular-aria/*',
          '**/angular-material/*',
          '**/angular-messages/*',
          '**/font-awesome/*' ],
        dest: 'dist/bower_components'
      },
      reactmaterial: {
        cwd: 'node_modules',
        expand: true,
        src: [
          '**/@material-ui/core/*',
          '**/font-awesome/*' ],
        dest: 'dist/node_modules'
      },
      externals: {
        cwd: 'src',
        expand: true,
        src: ['**/external/*'],
        dest: 'dist'
      },
      pluginDef: {
        expand: true,
        src: ['README.md'],
        dest: 'dist',
      }
    },

    packageModules: {
      dist: {
        src: 'package.json',
        dest: 'dist/src'
      },
    },

    tslint: {
      options: {
        // Task-specific options go here.
        configuration: "tslint.json"
      },
      files: {
        // Target-specific file lists and/or options go here.
        src: ['src/**/*.ts',  '!src/panels/external/**' ],
      },
    },

    ts: {
      build: {
        tsconfig: './tsconfig.json',
        src: ['src/**/*.ts', '!src/**/*.d.ts', '!src/panels/external/**'],
        dest: 'dist'
      }
    },

    sass: {
      options: {
        sourceMap: false
      },
      dist: {
        files: {
          "dist/css/sensu-app.dark.css": "src/sass/sensu-app.dark.scss",
          "dist/css/sensu-app.light.css": "src/sass/sensu-app.light.scss",
          "dist/css/sensu-app.common.css": "src/sass/sensu-app.common.scss",
        }
      }
    },

    run: {
      options: {
        // Task-specific options go here.
      },
      tests: {
        cmd: 'jest',
        args: [
          '--color',
          '--verbose'
        ]
      }
    },

    watch: {
      files: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.html', 'src/**/*.css', 'src/**/*.scss', 'src/img/*.*', 'src/plugin.json', 'tests/**/*.ts', 'README.md'],
      tasks: ['default'],
      options: {
        debounceDelay: 250,
      },
    }

  });


  grunt.registerTask('default', [
    'tslint',
    'ts:build',
    'sass',
    'run:tests',
    "copy:main",
    "copy:externals",
    "copy:pluginDef"
  ]);
  grunt.registerTask('bower', [
    "copy:bower"
  ]);
  grunt.registerTask('release', [
    'clean',
    'tslint',
    'ts:build',
    'sass',
    'run:tests',
    "copy:main",
    "copy:bower",
    "copy:externals",
    "copy:pluginDef"
  ]);
};
