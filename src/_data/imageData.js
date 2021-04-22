//const CacheAsset = require("@11ty/eleventy-cache-assets");

const cloudinary = require('cloudinary');
//const fs = require('fs');


module.exports = async function(){

	const returnData = '';
	
	cloudinary.config({ 
		  cloud_name: 'stsmith', 
		  api_key: '183459463763494', 
		  api_secret: 'PggVaFagyP1HSfPjL5odpdn2psg' 
	});
	
	const cloudImageData = cloudinary.v2.search.expression('trailcoffee').max_results(500).execute().then(result => {
		
		
		let jsonData = [];
	
		for(const i in result.resources){
			const resultItem = result.resources[i];
	
			jsonData.push({
				'public_id': resultItem.public_id,
				'width': resultItem.width,
				'height': resultItem.height,
				'format': resultItem.format
			});
		};
		
		return jsonData;
		//fs.writeFileSync('./image-data.json', JSON.stringify(jsonData));
		
	});

	return cloudImageData;

}