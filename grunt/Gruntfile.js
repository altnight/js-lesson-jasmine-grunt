// from grunt-contrib-livereload github README
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: '<json:package.json>',

    concat: {
      dist: {
        src: ['../jasmine/src/*'],
        dest: 'main.js'
      }
    },

    uglify: {
      options: {
        mangle: true
      },
      my_target: {
        files: {
          'main.min.js': ['main.js']
        }
      }
    },

    compress: {
      options: {
        archive: 'archive.zip'
      },
      files: {
        src: ['main.min.js'],
        dest: 'destzip'
      }
    },

    jshint: {
      options:{
        jshintrc: '../../.jshintrc' // valid JSON file or dict
      },
      files: ['../jasmine/src/*']
    },

    watch: {
      scripts: {
        files: ['../jasmine/src/*'],
        tasks: ['jshint']
      }
    },

    connect: {
      livereload: {
        options: {
          // これは connect のポート
          // livereload のポートはデフォルトだと 35729
          // ちなみにいま(20130628)時点では grunt-contrib-livereload としてとりこまれたみたい
          port: 9001,
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, '.')];
          }
        }
      }
    },
    // Configuration to be run (and then tested)
    regarde: {
      fred: {
        files: '../Public/a.html',
        tasks: ['livereload']
      }
    }
  });

  // load task
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');

  // Default task
  grunt.registerTask('default', ['livereload-start', 'connect', 'regarde']);
  //grunt.registerTask('default', ['concat', 'uglify', 'compress']);
  //grunt.registerTask('default', ['watch']);
};
