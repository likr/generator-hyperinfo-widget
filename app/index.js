'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var HyperinfoWidgetGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the stunning HyperInfo widget generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'widgetName',
        message: 'Widget name',
        default: this.appname.split(' ').join('-')
      },
      {
        type: 'list',
        name: 'lang',
        message: 'Scripting language',
        choices: [
          'JavaScript',
          'CoffeeScript',
          'TraceurCompiler'
        ],
        default: 'JavaScript'
      },
      {
        type: 'input',
        name: 'width',
        message: 'Widget width',
        default: 100
      },
      {
        type: 'input',
        name: 'height',
        message: 'Widget height',
        default: 100
      },
      {
        type: 'input',
        name: 'x',
        message: 'Widget position x',
        default: 100
      },
      {
        type: 'input',
        name: 'y',
        message: 'Widget position y',
        default: 100
      }
    ];

    this.prompt(prompts, function (props) {
      this.widgetName = props.widgetName;
      this.width = props.width;
      this.height = props.height;
      this.x = props.x;
      this.y = props.y;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.dest.mkdir(this.widgetName);
      this.dest.mkdir(this.widgetName + '/scripts');
      this.dest.mkdir(this.widgetName + '/styles');

      this.template('package.json', 'package.json');
      this.template('bower.json', 'bower.json');
      this.template('Gruntfile.js', 'Gruntfile.js');

      this.template('index.html', this.widgetName + '/index.html');
      this.template('script.js', this.widgetName + '/scripts/' + this.widgetName + '.js');
      this.template('style.css', this.widgetName + '/styles/' + this.widgetName + '.css');
      this.template('gadget.xml', this.widgetName + '/gadget.xml');
      this.template('icon.png', this.widgetName + '/icon.png');
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = HyperinfoWidgetGenerator;
