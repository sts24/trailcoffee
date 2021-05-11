require('dotenv').config();

const { AssetCache } = require("@11ty/eleventy-cache-assets");
const cloudinary = require('cloudinary');

const cacheID = 'cloud_image_meta';

module.exports = async function(){

	cloudinary.config({ 
		  cloud_name: process.env.CLOUD_NAME, 
		  api_key: process.env.CLOUD_KEY, 
		  api_secret: process.env.CLOUD_SECRET
	});

	let asset = new AssetCache(cacheID);

	if(asset.isCacheValid("7d")) {
		console.log('cache accesssed');
		return asset.getCachedValue();
	} else {
	
		function getData() {
			return new Promise(function (resolve, reject) {
				cloudinary.v2.search.expression('trailcoffee').max_results(500).execute().then(result => {
				
					console.log('calling cloudinary API');
					
					let jsonData = {};
				
					for(const i in result.resources){
						const resultItem = result.resources[i];

						const key = resultItem.public_id;

						jsonData[key] = {
							'public_id': resultItem.public_id,
							'width': resultItem.width,
							'height': resultItem.height,
							'format': resultItem.format,
							'version': resultItem.version
						};

					};

					resolve(jsonData);
				});
			});
		};


		return getData().then(data => {
			console.log('cloudinary accessed');
			asset.save([JSON.stringify(data)], cacheID); 
			return data
		});

	}



}