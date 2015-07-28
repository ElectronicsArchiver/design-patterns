module.exports = {
  compass: {
    files: ['src/sass/**/*.{scss,sass}'],
    tasks: ['compass:dev']
  },
  components: {
    files: ['src/components/**/*.mustache'],
    tasks: ['makedocs:dev']
  },
  pages: {
    files: ['src/pages/*.md', '!src/pages/sample.md'],
    // tasks: ['newer:makedocs:dev'] // Recreates nav with single, changed file :(
    tasks: ['makedocs:dev']
  },
  study: {
    files: ['src/study-new/**/*.html'],
    tasks: ['newer:copy:study']
  },
  js: {
    files: ['src/js/**/*.js'],
    tasks: ['newer:copy:dev']
  },
  img: {
    files: ['src/img/**/*.{png,jpg,svg,gif}'],
    tasks: ['newer:copy:dev']
  },
  autoprefix: {
    files: ['dev/css/*.raw.css'],
    tasks: ['newer:autoprefixer:dev']
  }
};