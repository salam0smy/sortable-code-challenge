var reader = require ("buffered-reader"),
	DataReader = reader.DataReader,
	Promise = require('promise'),
	fs = require('fs');

function FileLoader (filename) {
	var lines = [];
    console.time("Loading File: "+ filename);
	var promise = new Promise(function (resolve, reject) {
			new DataReader (filename, { encoding: "utf8" })
        .on ("error", function (error){
            console.log (error);
            reject(err);
        })
        .on ("line", function (line, nextByteOffset){
            try{
                lines.push(JSON.parse(line));
            }
            catch(error){
                reject(error);
            }
        })
        .on("end", function(){
        	resolve(lines);
            console.timeEnd("Loading File: "+ filename);
        })
        .read();
	});
	return promise;
}

function writeToFile (fileName, results) {
	fs.appendFile(fileName, JSON.stringify(results)+",", 
        function (err) {
            if (err) return console.log(err);
        });
}

exports.loadFile = FileLoader;
exports.saveFile = writeToFile;