module.exports = function (grunt) {

  var path = require('path');

  require('time-grunt')(grunt);

  // Load all the tasks from config/
  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'config')
  });

  // Load custom tasks
  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['bower']);

  // Lcoal development
  grunt.registerTask('dev', ['makedocs:dev', 'copy:dev', 'copy:templates', 'jshint:dev', 'compass:dev', 'postcss:dev', 'browserSync:dev', 'watch', 'clean:dev']);
  // Build process - minified CSS and JS
  grunt.registerTask('build', ['bump:patch', 'clean:build', 'makedocs:build', 'copy:build', 'compass:build', 'postcss:build', 'tinymce', 'clean:precssmin', 'modernizr', 'cssmin', 'newer:imagemin', 'requirejs', 'jshint:dev', 'header:build', 'clean:postbuild']);
  // Publish to york.ac.uk/pattern-library
  grunt.registerTask('publish', ['build', 'bump:minor', 'sftp:build']);
  //grunt.registerTask('live', ['build', 'bump:major', 'header:live', 'clean:live']);

}