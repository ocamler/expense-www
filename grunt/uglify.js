module.exports = {

  dist: {
    files: [{
      expand: true,
      cwd: '<%= dist %>/js',
      dest: '<%= dist %>/js',
      src: '*.js',
    }]
  },

};

