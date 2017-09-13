var Search = {};

(function ($) {
	Search.printResults = function (data) {
		if (typeof (data.items) !== 'undefined' && data.items.length > 0) {
			// Save current result set
			Search.currentResultSet = data.items;

			var allHtml = '';
			$.each(data.items, function (index, value) {
				allHtml += Search.getSingleResultHTML(index, value);
			});

			Search.searchList.html(allHtml);
		}
	};

	Search.getSingleResultHTML = function (index, data) {
		var html = '<li class="list-group-item">';
		html += '<div class="media"><div class="media-left">';
		html += '<img class="media-object" src="' + data.snippet.thumbnails.default.url + '" alt="" width="120" height="90">';
		html += '</div><div class="media-body">';
		html += '<h4 class="media-heading">' + data.snippet.title + '</h4>';
		html += '<p>' + data.snippet.channelTitle + '</p>';
		html += '<p><button type="button" data-index="' + index + '" class="js-add-to-playlist btn btn-primary btn-xs">Add to playlist</button></p>';
		html += '</div></div></li>';

		return html;
	}

	Search.init = function () {
		Search.searchList = $("ul#search-list");

		// Initialize search form
		searchForm = $('#search-form');
		searchForm.on('submit', function (e) {
			e.preventDefault();

			$.getJSON(
				searchForm.prop('action'),
				searchForm.serialize()
			).done(function (result) {
				Search.printResults(result);
			}).fail(function (result) {
				var err = textStatus + ", " + error;
				console.log("Request Failed: " + err);
			});
		});

		// Initialize add to playlist button clicks
		Search.searchList.on('click', '.js-add-to-playlist', function () {
			var _this = $(this);
			if (typeof (Playlist) !== 'undefined') {
				var item = Search.currentResultSet[parseInt(_this.data('index'))];
				Playlist.add(item);
			}
		});
	};

	$(Search.init);
})(jQuery);