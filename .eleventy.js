const pluginRss = require("@11ty/eleventy-plugin-rss");
const cloudinary = require('cloudinary');

cloudinary.config({
	cloud_name: 'stsmith'
});

module.exports = function (config) {


	// enable tags from directory to be merged with posts' own tags
	config.setDataDeepMerge(true);


	// shortcodes
	config.addShortcode("timestamp", function (UTC) {
		let newDate = new Date(UTC);

		return newDate.toLocaleDateString('en-US', {
			timeZone: 'UTC',
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	});

	config.addShortcode("postTags", function (tags, placeData) {
		let postTags = '';

		tags.forEach(function (tag) {
			if (tag !== 'post') {
				postTags += 'More from <a href="/places/' + tag + '/" class="tag-link">' + placeData[tag].fullname + '</a>';
			}
		});

		return postTags;
	});

	config.addShortcode("cleanString", function (string) {
		return string.replace(/<\/?[^>]+(>|$)/g, "");
	});


	config.addShortcode("imgPath", function (filename, w, h, c) {
		const image = cloudinary.url('trailcoffee/' + filename, {
			version: "1580148807",
			secure: true,
			width: w,
			height: h,
			crop: c
		});

		return image;
	});


	// add RSS feed
	config.addPlugin(pluginRss);


	// options

	return {
		dir: {
			input: "src",
			output: "build"
		},
		passthroughFileCopy: true,
		layout: 'layouts/page.njk',
		templateFormats: [
			"njk",
			"md",
			"jpg",
			"gif",
			"png",
			"woff",
			"html",
			"yml",
			"svg"
		]
	};
};