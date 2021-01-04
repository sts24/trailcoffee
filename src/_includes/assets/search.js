const Alpine = require('alpinejs');


window.search = function(){
	return {
		searchTerm: '',
		searchIndex: [],
		searchResults: [],
		init() {

			// get search index data
			fetch('/search.json')
				.then(response => response.json())
				.then(res => {
					this.searchIndex = res.search;
				});

		},
		getSearchData(e) {

			if(this.searchTerm.length > 3){
				const searchInput = this.searchTerm.toLowerCase();
				const searchData = JSON.parse(JSON.stringify(this.searchIndex));

				this.searchResults = [];

				searchData.forEach(item => {

					let searchString = item.text.toLowerCase();
					let results = searchString.includes(searchInput);

					if(results == true){
						this.searchResults.push(item);
					}

				});

				this.setupKeyboardControl(e);
			} else if(this.searchTerm.length <= 3){
				this.removeKeyboardControl();
			}

		},
		setupKeyboardControl(e){

			const resultItems = e.querySelectorAll('.site-search-results > li > a');

			if(resultItems.length > 0){

				const resultsTotal = resultItems.length;
				let focusIndex = 0;
				resultItems[focusIndex].focus();

				document.addEventListener('keydown', this.searchResultsKeyboardControl, false);

			}

		},
		removeKeyboardControl(){
			document.removeEventListener('keydown', this.searchResultsKeyboardControl);
		},
		searchResultsKeyboardControl(event){
			event.preventDefault();

			if(event.code == 'ArrowDown'){
				if(focusIndex < resultsTotal){
					focusIndex++;	
					resultItems[focusIndex].focus();
				}
			}
			else if(event.code == 'ArrowUp'){
				if(focusIndex >= 0){
					focusIndex--;	
					resultItems[focusIndex].focus();
				}
			}

			return false
		}
	}
}
