const pluginRss = require("@11ty/eleventy-plugin-rss");
const cloudinary = require('cloudinary');
const pluginSass = require("eleventy-plugin-sass");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME
});

module.exports = function (config) {

	// site map setup
	config.addPlugin(sitemap, {
		sitemap: {
			hostname: "https://trailcoffee.smithscott.net",
		},
	});

	// compile sass assets
	config.addPlugin(pluginSass, {
		outputDir: './build/assets/css',
		remap: true,
		sourceMaps: true
	});


	// enable tags from directory to be merged with posts' own tags
	config.setDataDeepMerge(true);


	// shortcodes

	config.addShortcode("cacheBuster", function () {

		let newDate = Date.now();

		return '?v=' + newDate;

	});

	config.addShortcode("log", function (data) {
		console.log(data);

		return true
	});

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

		const fileVersion = filename.split('/v')[1].split('/')[0];
		const splitFilename = filename.split('/');
		const newFilename = splitFilename[2] + '/' + splitFilename[3];

		let options = {};

		if (w !== '') { options['width'] = w; }
		if (h !== '') { options['height'] = h; }
		if (c !== '') { options['crop'] = c; }

		options['version'] = fileVersion;
		options['secure'] = true;

		const image = cloudinary.url(newFilename, options);

		return image;
	});

	config.addNunjucksFilter("getImgID", function (filename) {
		const fileVersion = filename.split('/v')[1].split('/')[0];
		const splitFilename = filename.split('/');
		const newFilepath = splitFilename[2] + '/' + splitFilename[3];
		const newFilename = newFilepath.split('.')[0];

		return newFilename;
	});

	config.addShortcode("formatCoords", function (coords) {
		const coordArray = coords.split(',');
		const newCoords = coordArray[1].trim() + ',' + coordArray[0].trim();
		return newCoords;
	});


	// add RSS feed
	config.addPlugin(pluginRss);

	// passthrough
	config.addPassthroughCopy("./src/_includes/svg");
	config.addPassthroughCopy({ "./src/_assets/fonts": "assets/fonts" });
	config.addPassthroughCopy({ "./src/gpx": "gpx" });
	config.addPassthroughCopy({ "./src/geo-json": "geo-json" });
	config.addPassthroughCopy({ "./src/_assets/js": "assets/js" })
	config.addPassthroughCopy({ './src/robots.txt': '/robots.txt' });

	// watch
	config.addWatchTarget("./src/_assets/sass/");
	config.addWatchTarget("./src/_assets/js/");

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