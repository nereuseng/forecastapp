var fs = require('fs-extra');

var source = './dist/bundle.js';
var dest = '../server-side/forecastapp-server/dist/bundle.js';
const vendorSource = './dist/vendor.bundle.js';
const vendorDest = '../server-side/forecastapp-server/dist/vendor.bundle.js';

fs.copy(source, dest).then(function (err) {
    console.log('Copied to ' + dest);
}).then( fs.copy(vendorSource, vendorDest).then( () =>{
    console.log('Copied to ' + vendorDest);
})).catch( err => { console.error(err)});