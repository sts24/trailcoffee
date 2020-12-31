function search(){
	return {
		searchTerm: '',
		allSearchTerms: [],
		searchResults: [],
		init() {

			let $this = this;

			fetch('/search.json')
				.then(response => response.json())
				.then(res => {

					Object.values(res.search).forEach(function(item){
						$this.allSearchTerms.push(item);
					});

					//this.allSearchTerms = res.search;

					return true
				});

		},
		getSearchData() {

			if(this.searchTerm.length > 3){
				const searchInput = this.searchTerm.toLowerCase();
				const searchData = JSON.parse(JSON.stringify(this.allSearchTerms));

				this.searchResults = [];

				searchData.forEach(item => {

					let searchString = item.text.toLowerCase();
					let results = searchString.includes(searchInput);

					if(results == true){
						console.log(item);
						this.searchResults.push(item);
					}
				});
			}

		}
	}
}