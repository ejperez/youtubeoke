var Playlist = {};

(function ($) {
	var items;
	var nowPlayingItem;

	var update = function () {
		var allHtml = '';

		$.each(items, function (index, value) {
			allHtml += Playlist.getSingleItemHTML(index, value);
		});

		Playlist.cueCount.html(items.length);
		Playlist.listItems.html(allHtml);
	};

	Playlist.hasNextItem = function () {
		return items.length > 0;
	};

	Playlist.setNowPlayingByIndex = function (index) {
		var itemToPlay = items[index];
		if (itemToPlay) {
			nowPlayingItem = itemToPlay;

			// Remove selected item in items
			items.splice(index, 1);
			update();

			// Add item to now playing panel
			Playlist.nowPlayingTitle.html(nowPlayingItem.snippet.title);

			Player.play(nowPlayingItem.id.videoId);
		}
	};

	Playlist.setNowPlaying = function (item) {
		if (item) {
			nowPlayingItem = item;

			// Add item to now playing panel
			Playlist.nowPlayingTitle.html(nowPlayingItem.snippet.title);

			Player.play(nowPlayingItem.id.videoId);
		}
	};

	Playlist.init = function () {
		items = [];

		Playlist.listItems = $('#play-list-items');
		Playlist.nowPlayingTitle = $('#now-playing-title');
		Playlist.cueCount = $('#queue-count');

		// Initialize play now button click
		Playlist.listItems.on('click', '.js-play-now', function () {
			var _this = $(this);
			var index = _this.data('index');
			Playlist.setNowPlayingByIndex(index);
		});

		// Initialize remove item button click
		Playlist.listItems.on('click', '.js-remove', function () {
			var _this = $(this);
			var index = _this.data('index');

			// Remove in items
			items.splice(index, 1);
			update();
		});

		// Resize the lists to keep the video in viewport
		var playListContainer = $('#play-list-container');
		var timeout;
		var resizeList = function () {
			var newHeight = Player.iframe.height() + 54;
			playListContainer.css({
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

	Playlist.getSingleItemHTML = function (index, data) {
		var html = '<li class="list-group-item">';
		html += '<div class="media">';
		html += '<img class="img-responsive" src="' + data.snippet.thumbnails.medium.url + '" alt="">';
		html += '<div class="media-body">';
		html += '<h4 class="media-heading">' + data.snippet.title + '</h4>';
		html += '<p>' + data.snippet.channelTitle + '</p><p>';
		html += '<button type="button" data-index="' + index + '" class="js-play-now btn btn-primary btn-xs">Play now</button>';
		html += '&nbsp;<button type="button" data-index="' + index + '" class="js-remove btn btn-danger btn-xs">Remove</button>';
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
})(jQuery);