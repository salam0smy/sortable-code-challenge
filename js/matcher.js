var async = require("async");
function Match(products, listings, FileLoader, TOLERENCE){
	var dateTime = new Date().getTime();
	async.each(products, function(product, callback){
		findMatchListings(product, listings, TOLERENCE, 
			function(_listings){
				if(_listings){
					FileLoader.saveFile("results-tolerence"+TOLERENCE+"-"+dateTime+".txt", {
						product_name: product.product_name,
						listings: _listings.map(function(_listing){
							return {
								"title": _listing.title,
  								"manufacturer": _listing.manufacturer,
  								"currency": _listing.currency,
  								"price": _listing.price
							}
						})
					});
				}
				callback();
		});
	}, function done(err){
	});
	
}

function findMatchListings(product, listings, tolerence, cb){
	var matchedListings = [];
	async.each(listings, function(listing, callback){
		if(listing.matched){
			//A single price listing may match at most one product.
		}
		else{
			var count = findMatch(listing, product);
			if(count >= tolerence){
				matchedListings.push(listing);
				listing.matched = true;
			}
		}
		callback();
	}, function(err){
    if( err ) {
      console.log('A file failed to process');
    } else {
      //console.log('All files have been processed successfully');
      if(matchedListings.length > 0)
      	cb(matchedListings);
      else{
      	cb();
      }
    }
});
}

function findMatch(listing, product){
	var counting = 0;
	for(key in product){
		if(product.hasOwnProperty(key) && key != "announced-date"){
			findInListing(product[key], listing,
				function(count){
					counting+= count;
				});
		}
	}
	return counting;	
}

function findInListing(value, listing, cb){
	var count = 0;
	var vals = value.split(/[ ,_]+/).filter(Boolean);
	return async.forEachOf(listing, 
		function (value, key, callback) {
			if(key != "price" || key != "currency"){
				vals.forEach(function(val){
					if(isMatch(val, value)){
						count++;
						if(key == "family")
							count =+ 1;
					}
				});
			}
			callback();
		}
		,function (err) {
		  if (err) console.error(err.message);
		  cb(count);
		});
}

function isMatch (value, target) {
	var reg = new RegExp(value, "i");
	return target.search(reg) > -1;
}

exports.matching = Match;