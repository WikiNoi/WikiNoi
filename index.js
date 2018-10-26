const fs = require('fs'),
        path = require('path');

const src = "src";

function extract(src, f) {
        if (process.env.POLYFILL == 'skip' && src.endsWith("0_polyfills")) {
                return
        }
        var dir = fs.readdirSync(src);
        dir.sort();
        dir.forEach(file => {
                const src_ = path.join(src, file)
                if (fs.statSync(src_).isDirectory()) {
                        extract(src_, f);
                } else if (path.extname(src_) == ".noi") {
                        fs.writeSync(f, fs.readFileSync(src_));
                }
        });
}

var file = fs.openSync("index.html", "w");
fs.writeSync(file, `<!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
              </head>
              <body>`);
extract(src, file);
fs.writeSync(file, "</body></html>");
fs.closeSync(file);
