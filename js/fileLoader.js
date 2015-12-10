var reader = require ("buffered-reader"),
	DataReader = reader.DataReader,
	Promise = require('promise'),
	fs = require('fs');

function loadFile (filename, initializer) {
	var lines = [];
    console.time("Load File: "+ filename);
	var promise = new Promise(function (resolve, reject) {
			new DataReader (filename, { encoding: "utf8" })
        .on ("error", function (error){
            console.log (error);
            reject(error);
        })
        .on ("line", function (line, nextByteOffset){
            try{
                if(initializer){
                    lines.push(new initializer(JSON.parse(line)));
                }
                else{
                    lines.push(JSON.parse(line));
                }
            }
            catch(error){
                reject(error);
            }
        })
        .on("end", function(){
        	resolve(lines);
            console.timeEnd("Load File: "+ filename);
        })
        .read();
	});
	return promise;
}

function writeToFile (fileName, results) {
    // write one line of JSON data to the file
	fs.appendFile(fileName, JSON.stringify(results)+"\n", 
        function (err) {
            if (err) return console.log(err);
        });
}

exports.loadFile = loadFile;
exports.saveToFile = writeToFile;