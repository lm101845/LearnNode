var fs = require('fs')

fs.readdir('D:/vedio/5-Node.js/www', function (err, files) { 
    if (err) { 
        return  console.log('目录不存在');
    }
    console.log(files);
})