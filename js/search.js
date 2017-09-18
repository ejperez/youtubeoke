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
		html += '<p class="channel-name">' + data.snippet.channelTitle + '</p><p>';
		html += '<button type="button" data-index="' + index + '" class="js-add-to-playlist btn btn-primary btn-xs">Add to playlist</button>';
		html += '&nbsp;<button type="button" data-index="' + index + '" class="js-play-now-from-search btn btn-primary btn-xs">Play now</button>';
		html += '</p></div></div></li>';

		return html;
	}

	Search.init = function () {
		Search.searchList = $("ul#search-list");

		// Initialize search form
		var searchForm = $('#search-form');
		var searchFormFieldset = $('#search-form fieldset');
		searchForm.on('submit', function (e) {
			e.preventDefault();
			var formData = searchForm.serialize();
			searchFormFieldset.prop('disabled', true);

			$.getJSON(
				searchForm.prop('action'),
				formData
			).done(function (result) {
				Search.printResults(result);
				searchFormFieldset.prop('disabled', false);
			}).fail(function (result) {
				console.error(result);
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

		// Initialize play now button clicks
		Search.searchList.on('click', '.js-play-now-from-search', function () {
			var _this = $(this);
			if (typeof (Playlist) !== 'undefined') {
				var item = Search.currentResultSet[parseInt(_this.data('index'))];
				Playlist.setNowPlaying(item);
			}
		});

		// Resize the lists to keep the video in viewport
		var searchListContainer = $('#search-list-container');
		var timeout;
		var resizeList = function () {
			var newHeight = Player.iframe.height();
			searchListContainer.css({
				overflowY: 'scroll',
				overflowX: 'hidden',
				overflow: 'auto',
				height: newHeight
			});
		}

		// Add throttling
		$(window).resize(function(){
			clearTimeout(timeout);
			timeout = setTimeout(resizeList, 100);
		});

		// Initiate list height
		resizeList();
	};
})(jQuery);