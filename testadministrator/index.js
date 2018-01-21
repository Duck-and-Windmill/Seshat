/* test node for seshat */

var express = require('express'),
	app = express(),
	path = require('path')
	less = require('less-middleware');

app.use(less(path.join(__dirname,'source','less'),{
    dest: path.join(__dirname, 'public'),
    options: {
        compiler: {
            compress: false,
        },
    },
    preprocess: {
        path: function(pathname, req) {
            return pathname.replace('/css/','/'); 
        },
    },
    force: true,
}));

// serve static content
app.use(express.static(path.join(__dirname, 'public')));

// setup server
var server = app.listen(1338);