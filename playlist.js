var Playlist = {};

(function ($) {
	var items;
	var nowPlayingItem;

	var update = function () {
		var allHtml = '';

		$.each(items, function (index, value) {
			allHtml += Playlist.getSingleItemHTML(value);
		});

		Playlist.listItems.html(allHtml);
	};

	Playlist.init = function () {
		items = [];

		Playlist.listItems = $('#play-list-items');

		// Enable sorting
		Playlist.listItems.sortable();
		Playlist.listItems.disableSelection();

		// Initialize play now button click
		Playlist.listItems.on('click', '.js-play-now', function () {
			var _this = $(this);
			if (typeof (player) !== 'undefined') {
				var id = _this.parents('.list-group-item').data('id');
				player.loadVideoById(id);
			}
		});
	};

	Playlist.getSingleItemHTML = function (data) {
		var html = '<li class="list-group-item" data-id="' + data.id.videoId + '">';
		html += '<div class="media"><div class="media-left">';
		html += '<img class="media-object" src="' + data.snippet.thumbnails.default.url + '" alt="" width="120" height="90">';
		html += '</div><div class="media-body">';
		html += '<h4 class="media-heading">' + data.snippet.title + '</h4>';
		html += '<p>' + data.snippet.channelTitle + '</p><p>';
		html += '<button type="button" class="js-play-now btn btn-primary btn-xs">Play now</button>';
		html += '</p></div></div></li>';

		return html;
	}

	Playlist.add = function (item) {
		if (item) {
			items.push(item);
			update();
		}
	};

	Playlist.getItems = function () {
		return items;
	};

	$(Playlist.init);
})(jQuery);