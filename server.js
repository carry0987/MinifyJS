const express = require('express');
const multer = require('multer'); // Handles multipart/form-data
const fs = require('fs');
const uglifyJS = require("uglify-js");
const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/compress', upload.single('file'), function (req, res, next) {
    fs.readFile(req.file.path, 'utf8', function (err, data) {
        if (err) {
            return res.status(500).json({msg: `Error reading file from disk: ${err}`});
        }

        const uglified = uglifyJS.minify(data);
        if (uglified.error) {
            return res.status(500).json({msg: `Error during JavaScript minification: ${uglified.error}`});
        }

        const requestType = req.query.request; // get request parameter
        const outputFile = '/compressed/' + req.file.originalname;

        if (requestType === 'file') {
            fs.writeFile(outputFile, uglified.code, function (err) {
                if (err) {
                    return res.status(500).json({msg: `Error writing minified JavaScript to disk: ${err}`});
                }
                
                res.json({msg: 'Script minification completed successfully.', filename: req.file.originalname, path: outputFile});
            });
        } else { // if 'request=content' or no 'request' parameter provided
            res.json({msg: uglified.code, filename: req.file.originalname}); // just send minified content.
        }
    });
});

app.use(function (err, req, res, next) {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({msg: err.message});
    }
    next(err);
});

// 404 error handler
app.use(function (req, res, next) {
    res.status(404).json({msg: 'Not Found'});
    next();
});

app.listen(3000, function () {
    console.log('App is listening on port 3000');
});
