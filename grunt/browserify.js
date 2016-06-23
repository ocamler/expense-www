module.exports = {

  options: {

    transform: [

      ['babelify', {

        presets: [
          'es2015',
          'stage-1',
          'react',
        ],

        // TODO: Until Babel 6 adds decorators.
        plugins:[
          'babel-plugin-transform-decorators-legacy',
        ]

      }],

      'yamlify',

    ],

    watch: true,

    browserifyOptions: {
      debug: false
    }
  },

  location: {
    src: '<%= src.js %>/location/*.js',
    dest: '<%= dist %>/js/location.js',
  },

  details: {
    src: '<%= src.js %>/details/*.js',
    dest: '<%= dist %>/js/details.js',
  },

  date: {
    src: '<%= src.js %>/date/*.js',
    dest: '<%= dist %>/js/date.js',
  },

  completed: {
    src: '<%= src.js %>/completed/*.js',
    dest: '<%= dist %>/js/completed.js',
  },

};

