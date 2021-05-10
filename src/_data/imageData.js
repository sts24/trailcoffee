require('dotenv').config();
const cloudinary = require('cloudinary');
const fs = require('fs');



module.exports = async function(){

	cloudinary.config({ 
		  cloud_name: process.env.CLOUD_NAME, 
		  api_key: process.env.CLOUD_KEY, 
		  api_secret: process.env.CLOUD_SECRET
	});
	
	const cloudImageData = cloudinary.v2.search.expression('trailcoffee').max_results(500).execute().then(result => {
		
		console.log('cloudinary accessed');
		
		let jsonData = [];
	
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

		
		return jsonData;
		
		
	});

	fs.writeFileSync('./image-data.json', cloudImageData);

	return cloudImageData;

}