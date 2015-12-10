
var FileLoader = require("./fileLoader");
var Match = require("./match");
var Product = require("./Product");
var Promise = require('promise');

var Output_FILENAME;

exports.start = function start(Products_FILENAME, Listings_FILENAME, output_FILENAME){
	Output_FILENAME = output_FILENAME;
	Promise.all([FileLoader.loadFile(Products_FILENAME, Product.Product), 
			FileLoader.loadFile(Listings_FILENAME)])
		.then(function (res) {
			console.log(res[0].length + " products loaded from: "+ Products_FILENAME);
			console.log(res[1].length + " listings loaded from: "+ Listings_FILENAME);
			var products = res[0],
			listings = res[1];
			matchProductListings(products, listings);
		});
}


function matchProductListings(products, listings){
	console.time("Matching products with listings");
	var results = Match.startMatching(products, listings);
	console.timeEnd("Matching products with listings");
	onResults(results);
}

function onResults (results) {
	console.time("writeResultsToFile");
	writeResults(results, Output_FILENAME);
	console.timeEnd("writeResultsToFile");
	console.log("Output file name: "+Output_FILENAME);
}

function writeResults(results, fileName){
	for(key in results){
		if(results.hasOwnProperty(key)){
			FileLoader.saveToFile(fileName, results[key]);
		}
	}
}