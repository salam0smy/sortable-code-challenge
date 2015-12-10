function Matching (products, listings) {
	var results = {};
	listings.forEach(function(listing){
		var matchCount = 0,
			currentResult;
		for(var i=0; i < products.length ; i++){
			var product = products[i];
			product.getMatchCount(listing, function(count){
				if(count >= matchCount){
					matchCount = count;
					currentResult = product;
				}
			});
		}
		var prodName = currentResult.getName();
		if(results[prodName]){
			results[prodName].listings.push(listing);
		}
		else{
			results[prodName] = {
				"product_name": prodName,
				listings: [listing]
			}
		}
	});

	return results;
}

exports.startMatching = Matching;