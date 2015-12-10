function Product(args){
	this.args = args;
	this.searchables = [];

	for(key in this.args){
		var weight = 1;
		if(this.args.hasOwnProperty(key) && key != 'announced-date'){
			var value = this.args[key];
			if(key == "family")
				weight++;
			this.splitToSearchables(value)
				.forEach(function(val){
					this.searchables.push({
						val: val,
						weight: weight
					});
				}, this);
		}
	}
}
Product.prototype.splitToSearchables =  function (value){
		return value.split(/[ ,_-]+/).filter(Boolean);
	}

Product.prototype.isMatch = function (value, target){
		var reg = new RegExp(value, "i");
		return target.search(reg) > -1;
	}

Product.prototype.getName = function (){
		return this.args["product_name"];
	}

Product.prototype.getMatch = function (target, cb){
		var count = 0;
		this.searchables.forEach(function(searchable){
			if(this.isMatch(searchable.val, target)){
					count += searchable.weight;
				}
			}, this);
		cb(count);
	}

Product.prototype.getMatchCount = function (listing, cb){
		var count = 0;
		this.getMatch(listing['title'], addCount);
		this.getMatch(listing['manufacturer'], addCount);
		cb(count);

		function addCount(_count){count += _count;}
	}

exports.Product = Product;