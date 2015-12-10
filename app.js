var app = require("./js/matchfinder");

// Make sure we got a filename and params on the command line.
if (process.argv.length < 4) {
  printErrorMsg();
  process.exit(1);
}

// get and validate input parameters
var Products_FILENAME = getProductsFileName(),
	Listings_FILENAME = getListingsFileName(),
	Output_FILENAME = getOutputFileName();

// start matching
app.start(Products_FILENAME, Listings_FILENAME, Output_FILENAME);


function getProductsFileName(){
	var products = process.argv[2];
	if(checkForString(products)){
		return products;
	}
	printInputErrorMsg("Products_FILENAME");
}

function getListingsFileName(){
	var listings = process.argv[3]
	if(checkForString(listings)){
		return listings;
	}
	printInputErrorMsg("Listings_FILENAME");
}

function getOutputFileName(){
	return process.argv[4] || "results-"+(new Date().getTime())+".txt";
}

function checkForString(value){
	return typeof value == "string"
}

function printInputErrorMsg(varName){
	console.error(varName + " must be a string.");
	printErrorMsg();
	process.exit(1);
}

function printErrorMsg(){
	console.log('Usage: node ' + process.argv[1] + ' <Products_FILENAME> <Listings_FILENAME> <outputfile>');
}
