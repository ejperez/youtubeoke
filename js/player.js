var Player = {};

(function ($) {
	var player;
	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	Player.onPlayerReady = function (event) {
		Player.iframe = $('#player');
		Player.iframe.addClass('embed-responsive-item');

		// Initiate search and playlist
		Search.init();
		Playlist.init();

		// Hide welcome screen
		$('#welcome').fadeOut(400);
	}

	Player.onPlayerStateChange = function (event) {
		if (event.data == YT.PlayerState.ENDED) {
			if (Playlist.hasNextItem()) {
				// Play the first item in the list
				Playlist.setNowPlayingByIndex(0);
			}
		}
	}

	Player.init = function () {
		if (typeof (Player.player) === 'undefined') {
			player = new YT.Player('player', {
				height: '390',
				width: '640',
				events: {
					'onReady': Player.onPlayerReady,
					'onStateChange': Player.onPlayerStateChange
				},
				playerVars: {
					rel: 0,
					showinfo: 0
				}
			});
		}
	};

	Player.play = function (videoId) {
		player.loadVideoById({
			videoId: videoId,
			rel: 0
		});
	};
})(jQuery);

function onYouTubeIframeAPIReady() {
	Player.init();
}