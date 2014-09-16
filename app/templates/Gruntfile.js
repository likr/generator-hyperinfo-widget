'use strict';

var path = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {
        options: {
          targetDir: '<%= widgetName %>',
          layout: function(type) {
            var renamedType = type;
            if (type === 'js') {
              renamedType = 'scripts';
            } else if (type === 'css') {
              renamedType = 'styles';
            }
            return path.join(renamedType, 'lib');
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-task');

  grunt.registerTask('build', []);
  grunt.registerTask('default', ['build']);
};
