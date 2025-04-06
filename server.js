const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {

    //set Header content type
    console.log(req.url, req.method)
    res.setHeader('Content-Type', 'text/html');
    const greet = _.once(() => {
        console.log('Hello WOrld!');
    })

    greet();
    

    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
            case '/contact':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end(); 
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    //send an html file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.write(data);
            res.end();
        }

    })
    
});


server.listen(3333, 'localhost', () => {

    console.log('Started Server on Port 3333.........')
});