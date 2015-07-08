'use strict';
var exec = require('child_process').exec;
var fs = require('fs');

module.exports = function (gulp, config, tasks) {
  var plDir = config.plDir || "pattern-lab";

  tasks.compile.push('plBuild');
  tasks.watch.push('watch:pl');

  gulp.task('plBuild', function (cb) {

    function plBuild(cb) {
      exec("php " + plDir + "core/builder.php --generate --nocache", function (err, stdout, stderr) {
        if (err) {return cb(err);}
        if (stderr) {console.error(stderr);}
        if (stdout) {console.log(stdout);}
        cb();
      });
    }

    // Need to check if `public/` exists yet - i.e. is this first run?
    fs.exists(plDir + "public/styleguide/html/styleguide.html", function (exists) {
      if (exists) {
        plBuild(cb);
      } else {
        // It's a first run; let's make the directory and copy the initial styleguide folder out of core and into public or we'll get errors.
        exec("mkdir -p " + plDir + "public/styleguide/ && cp -r " + plDir + "core/styleguide/ " + plDir + "public/styleguide/", function (err, stdout, stderr) {
          if (err) {return cb(err);}
          if (stderr) {console.error(stderr);}
          plBuild(cb);
        });
      }
    });

  });

  gulp.task('watch:pl', ['plBuild'], function () {
    return gulp.watch(plDir + 'source/**/*.{mustache,json}', [
      'plBuild'
    ]);
  });

};
