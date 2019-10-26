const pluginRss = require("@11ty/eleventy-plugin-rss");


module.exports = function (config) {



	// shortcodes

	function getIconCode(iconName, cssClass) {
		return `
		<svg class="svg-icon ${cssClass}" shape-rendering="geometricPrecision" role="presentation">
			<use xlink: href="#${iconName}"></use>
    	</svg>`;
	}

	config.addShortcode("icon", function (iconName, cssClass) {
		return getIconCode(iconName, cssClass);
	});

	config.addPairedShortcode("sectionHeader", function (data, sectionTitle = '', cssClass = '') {
		let htmlSlot = '';

		if (sectionTitle !== '') {
			htmlSlot = `
			<div class="col-s-12">
				<div class="section-heading">${sectionTitle}</div>
				${data}
			</div>`;
		} else {
			htmlSlot = `${data}`;
		}

		return `
			<header class="page-title padding-x-2 ${cssClass}">
				<div class="row">
					${htmlSlot}
				</div>
			</header>
		`;
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

	config.addShortcode("blogTitle", function (heading, css = '', post) {

		let postURL = post.url;
		let classes = (css !== '') ? ' class="' + css + '"' : '';
		let html = '<' + heading + classes + '>';

		if (typeof post.data.url !== 'undefined') {
			html += getIconCode('icon-link', 'icon-size-1 icon-inline blog-link-icon') + ' ';
			postURL = post.data.url;
		}

		html += '<a href="' + postURL + '">';
		html += post.data.title;
		html += '</a></' + heading + '>';

		return html
	});

	config.addShortcode("cleanString", function (string) {
		return string.replace(/<\/?[^>]+(>|$)/g, "");
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