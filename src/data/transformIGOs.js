// var fs = require('fs');

// var obj = JSON.parse(fs.readFileSync('./IGOs.json', 'utf8'));

// // console.log(obj);

// Object.keys(obj).forEach(key => {
//     let organizations = obj[key];
//     obj[key] = {};
//     let keyWithoutSpaceForWikipediaSearch = key.replace(" ", "_") 
//     obj[key].wikiPage = "https://en.wikipedia.org/wiki/" + keyWithoutSpaceForWikipediaSearch;
//     obj[key].organizations = organizations;
// })


// let jsonString = JSON.stringify(obj)

// fs.writeFile("./IGOs2.json", jsonString, function(err, result) {
//     if(err) console.log('error', err);
//   })





