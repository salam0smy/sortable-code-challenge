
var FileLoader = require("./fileLoader");
var Match = require("./matcher");
var Promise = require('promise');

// Make sure we got a filename on the command line.
if (process.argv.length < 5) {
  console.log('Usage: node ' + process.argv[1] + ' Products_FILENAME Listings_FILENAME TOLERENCE');
  process.exit(1);
}

var Products_FILENAME = process.argv[2],
	Listings_FILENAME = process.argv[3],
	products, listings, 
	TOLERENCE = process.argv[4];


Promise.all([FileLoader.loadFile(Products_FILENAME), 
			FileLoader.loadFile(Listings_FILENAME)])
		.then(function (res) {
			console.log(res[0].length + " products loaded from: "+ Products_FILENAME);
			console.log(res[1].length + " listings loaded from: "+ Listings_FILENAME);
			products = res[0];
			listings = res[1];
			console.time("Matching products with listings");
			Match.matching(products, listings, FileLoader, TOLERENCE);
			console.timeEnd("Matching products with listings");
		});