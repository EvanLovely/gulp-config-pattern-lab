# Pattern Lab gulp configuration

**WORK IN PROGRESS**

This isn't a gulp module, it configures them.

# Setup

Install this into your project:

    npm install gulp-config-pattern-lab --save

Add this to `gulpfile.js`:

    require('gulp-config-pattern-lab')(gulp, config, tasks);

The above line will pull in [`index.js`](https://github.com/EvanLovely/gulp-config-pattern-lab/blob/master/index.js) just like it was in your `gulpfile.js` and it'll register and configure all the gulp tasks for you. 

A more complete `gulpfile.js` would look like:

    var config = {
      "plDir": "pattern-lab"
    };
    var tasks = {
      "compile": [],
      "watch": [],
      "validate": []
    };
    
    require('gulp-config-pattern-lab')(gulp, config, tasks);
    
    gulp.task('compile', tasks.compile);
    gulp.task('validate', tasks.validate);
    gulp.task('watch', tasks.watch);

# Task commands

- `gulp plBuild` - Builds Pattern Lab
- `gulp watch:pl` - Watches for changes, then triggers a build 

# Modifying this file and using it as a starting point

Just copy `index.js` out and put it in your repo, rename it to `pattern-lab.js` and put it perhaps in a `gulp-tasks/` folder. Then add this to `gulpfile.js`:

    require('gulp-tasks/pattern-lab.js')(gulp, config, tasks);

Then just install all the packages listed at the top of that file with the `npm install {name of packages} --save` command. Now you can modify this file any way you want!
