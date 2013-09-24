module.exports = function(grunt) {
  var fs = require('fs');

  //init configuration
  grunt.config.init({
    pkg: grunt.file.readJSON('package.json')
  });

  //clean
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.config('clean', {
    dist: 'dist'
  });

  //js hint
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.config('jshint', {
    options: { },
    all: [
      'Gruntfile.js',
      'src/js/**/*.js'
    ]
  });

  var banner = '/*!\n<%= pkg.name %> - <%= pkg.version %>\n' +
              '<%= pkg.description %>\n'+
              'Build date: <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n';

  //cssmin
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.config('cssmin', {
    css: {
      options: {
        banner: banner
      },
      files: [{
        dest: 'dist/css/xeditable.css', src: ['src/css/xeditable.css']
      }]
    }
  });

  //concat
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.config('concat', {
    //wrap css in js string
    /*
    css: {
      options: {
        banner: 'angular.element(document).find(\'head\').append(\'<style type="text/css">',
        footer: '\');'
      },
      files: [{
        src: [paths.TMP+'/output.css'],
        dest: paths.TMP+'/output.js'
      }]
    },
    */
    dist: {
      options: {
        banner: banner
      },
      src: ['src/js/module.js', 'src/js/**/*.js'],
      dest: 'dist/js/xeditable.js'
    }
  });

  //uglify
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.config('uglify', {
    options: {
      banner: banner
    },
    dist: {
      src: ['<%= concat.dist.dest %>'],
      dest: 'dist/js/xeditable.min.js'
    }
  });


  //compress
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.config('compress', {
    main: {
      options: {
        archive: 'zip/angular-xeditable-<%= pkg.version %>.zip'
      },
      expand: true,
      cwd: 'dist/',
      src: ['**'],
      dest: '/'
    }
  });

  //jade
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.config('jade', {
    docs: {
      options: {
        client: false,
        pretty: true,
        data: {
          fs: require('fs'),
          md: require('marked'),
          version: '<%= pkg.version %>',
          size: Math.floor(fs.statSync('dist/js/xeditable.min.js').size / 1024)
        }
      },
      files: [{src: 'docs/jade/main.jade', dest: 'index.html'}]
    }
  });

  //connect
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.config('connect', {
    server: {
      options: {
        port: 8000,
        base: '.'
      }
    }
  });

  //watch
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.config('watch', {
    jade: {
      files: ['docs/**/*'],
      tasks: ['jade'],
      options: {
        spawn: false
      }
    }
  });

  //metatasks
  grunt.registerTask('build', [
    'jshint',
    'clean',
    'cssmin',
    'concat',
    'uglify',
    'compress',
    'docs'
  ]);

  grunt.registerTask('docs', [
    'jade'
  ]);

  grunt.registerTask('server', [
    'connect:server:keepalive'
  ]);

};
