module.exports = {
  dev: {
    files: [{
      expand: true,
      dot: true,
      cwd: 'src/',
      src: ['js/**', 'img/**', 'fonts/**', 'media/**'],
      dest: 'dev/'
    }]
  },
  templates: {
    files: [{
      expand: true,
      dot: true,
      cwd: 'src/',
      src: ['templates/**'],
      dest: 'dev/'
    }]
  },
  build: {
    files: [{
      expand: true,
      dot: true,
      cwd: 'src/',
      src: ['fonts/**', 'media/**', 'js/prism.js', 'js/iframeResizer.contentWindow.min.js', 'opensearch.xml'],
      dest: 'build/'
    }]
  },
  release: {
    files: [{
      expand: true,
      dot: true,
      cwd: 'build/',
      src: ['css/**', 'fonts/**', 'img/**', 'js/**', 'opensearch.xml'],
      dest: 'release/'
    }]
  }
};