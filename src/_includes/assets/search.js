function search(){
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
			}

		},
		setupKeyboardControl(e){

			const resultItems = e.querySelectorAll('.site-search-results > li > a');

			if(resultItems.length > 0){

				const resultsTotal = resultItems.length;
				let focusIndex = 0;
				resultItems[focusIndex].focus();

				window.addEventListener('keyup', event => {
					if(event.code == 'ArrowDown'){
						focusIndex++;
						if(focusIndex < resultsTotal){	
							resultItems[focusIndex].focus();
						}
						return false;
					}
					else if(event.code == 'ArrowUp'){
						focusIndex--;
						if(focusIndex >= 0){	
							resultItems[focusIndex].focus();
						}
						return false;
					}
				}, false)

			}

		}
	}
}