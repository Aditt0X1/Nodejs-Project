const fs = require('fs');

// //read files

fs.readFile('./docs/blog1.txt', (err, data) => {
    if (err) {
        console.log(err);
    }
    console.log(data.toString());
});

console.log('last line')


//write fiels

fs.writeFile('./docs/blog1.txt', 'Hello, World', () => {
    console.log('file was written')
})


//directories

if (!fs.existsSync('./assets')) {
  
    fs.mkdir('./assets', (err) => {
        if (err) {
         console.log(err);
        }
     }); console.log('Directory was created')
     
} else {
    fs.rmdir('./assets', (err)=> {
        if (err) {
            console.log(err)
        } console.log('folder Deleted')
    });
}

//deleting files 'not directory'

if (fs.existsSync('./doscs/deletme.txt')) {
   
    fs.unlink ('./docs/deleteme.txt', (err) => {
        if (err) {
            console.log(err);
        } console.log('File Deleted')
    });

}

  