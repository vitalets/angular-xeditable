module.exports = function(grunt) {
  var fs = require('fs');
  var extend = require('util')._extend;

  grunt.util.linefeed = '\n';

  //init configuration
  grunt.config.init({
    pkg: grunt.file.readJSON('package.json')
  });

  //clean
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.config('clean', {
    dist: 'dist',
    starter: 'starter/angular-xeditable'
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
        dest: 'dist/css/xeditable.min.css', src: ['src/css/xeditable.css']
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

  //copy
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.config('copy', {
    css: {
      src: 'src/css/xeditable.css',
      dest: 'dist/css/xeditable.css'
    },
    starter:  {
      expand: true,
      cwd: 'dist/',
      src: '**',
      dest: 'starter/angular-xeditable/'
    }
  });

  //compress
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.config('compress', {
    dist: {
      options: {
        archive: 'zip/angular-xeditable-<%= pkg.version %>.zip'
      },
      expand: true,
      cwd: 'dist/',
      src: ['**'],
      dest: '/'
    },
    starter: {
      options: {
        archive: 'zip/angular-xeditable-starter.zip'
      },
      expand: true,
      cwd: 'starter/',
      src: ['**'],
      dest: '/'
    }
  });

  //jade
  var marked_ = require('marked');
  var marked = function(text) {
    var tok = marked_.lexer(text);
    text = marked_.parser(tok);
    // workaround to replace marked `<pre><code>` with '<pre class="prettyprint">'
    text = text.replace(/<pre><code>(.*)<\/code><\/pre>/ig, '<pre class="prettyprint">$1</pre>');
    return text;
  };



  var jadeData = {
    fs: require('fs'),
    md: marked,
    version: '<%= pkg.version %>',
    structure: require('./docs/js/structure.js'),
    jsdoc: '<%= jsdocdata %>'
  };

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.config('jade', {
    docs: {
      options: {
        pretty: true,
        data: extend(extend({}, jadeData), {env: 'prod'})
      },
      files: [{src: 'docs/jade/main.jade', dest: 'index.html'}]
    },
    docsdev: {
      options: {
        pretty: true,
        data: extend(extend({}, jadeData), {env: 'dev'})
      },
      files: [{src: 'docs/jade/main.jade', dest: 'dev.html'}]
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
      files: ['docs/**/*', 'jsdoc.json'],
      tasks: ['loadjsdoc', 'jade:docsdev'],
      options: {
        spawn: false
      }
    },
    jsdoc: {
      files: ['src/**/*.js'],
      tasks: ['shell:jsdoc'],
      options: {
        spawn: false
      }
    }
  });

  // jsdoc
  // grunt jsdoc cant output to plain json
  // grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-shell');
  grunt.config('shell', {
    jsdoc: {
      options: {
        stdout: true,
        stderr: true,
        failOnError: true
      },
      command: '"node_modules/grunt-jsdoc/node_modules/jsdoc/jsdoc" -c jsdoc.conf.json > jsdoc.json'
    }
  });

  // loadjsdoc
  grunt.config.set('jsdocdata', {namespaces: []});
  grunt.registerTask('loadjsdoc', function() {
    if (grunt.file.exists('./jsdoc.json')) {
      grunt.config.set('jsdocdata', require('./jsdoc.json'));
    }
  });


  //metatasks
  grunt.registerTask('build', [
    'jshint',
    'clean',
    'cssmin',
    'concat',
    'uglify',
    'copy',
    'compress',
    'docs'
  ]);

  grunt.registerTask('docs', [
    'shell:jsdoc',
    'loadjsdoc',
    'jade'
  ]);

  grunt.registerTask('server', [
    'connect:server:keepalive'
  ]);

};
