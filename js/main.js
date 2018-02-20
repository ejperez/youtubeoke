window.onload = function () {
	var app = new Vue( {
		el: '#wrapper',
		computed: {
			playlistCount: function () {
				return this.playlist.length;
			}
		},
		data: {
			isSideMenuShown: false,
			isLoading: false,
			activeTab: null,
			playlist: [],
			searchResults: [],
			currentSong: null,
			player: null,
			searchKeyword: null,
			showPlayer: false,
			formData: {
				q: null,
				part: 'snippet',
				key: 'AIzaSyCc-Ig4WkasVymPRqJbxnr7mF7NXLZPk84',
				maxResults: 50,
				type: 'video'
			}
		},
		mounted: function () {
			this.formData.q = 'karaoke';
			this.searchSong();
		},
		methods: {
			addToPlaylist: function ( item ) {
				this.playlist.push( item );
			},
			searchSong: function () {

				var vm = this;

				vm.isLoading = true;

				axios.get( 'https://www.googleapis.com/youtube/v3/search', {
					params: this.formData
				} ).then( function ( response ) {
					if ( response.data.hasOwnProperty( 'items' ) && response.data.items.length > 0 ) {

						vm.searchResults = [];

						vm.isLoading = false;

						response.data.items.forEach( function ( item ) {
							vm.searchResults.push( {
								id: item.id.videoId,
								title: item.snippet.title,
								channel: item.snippet.channelTitle,
								image: item.snippet.thumbnails.medium.url
							} );
						} );
					}
				} );
			},
			playSongFromPlaylist: function ( song, index ) {
				this.deleteSong( index );
				this.playSong( song );
			},
			playSong: function ( song ) {

				var vm = this;

				var playSong = function ( song ) {
					vm.currentSong = song;

					vm.player.loadVideoById( {
						videoId: song.id,
						rel: 0
					} );
				};

				if ( vm.player === null ) {

					vm.showPlayer = true;

					var onPlayerReady = function () {
						playSong( song );
					};

					var onPlayerStateChange = function ( event ) {

						if ( event.data == YT.PlayerState.ENDED ) {

							var nextSong = vm.playlist.shift();

							if ( nextSong ) {
								vm.playSong( nextSong );
							} else {
								vm.currentSong = null;
							}
						}
					};

					// Create Youtube iFrame API instance
					vm.player = new YT.Player( 'player', {
						height: '390',
						width: '640',
						events: {
							'onReady': onPlayerReady,
							'onStateChange': onPlayerStateChange
						},
						playerVars: {
							rel: 0,
							showinfo: 0
						}
					} );
				} else {
					playSong( song );
				}
			},
			deleteSong: function ( index ) {
				this.playlist.splice( index, 1 );
			},
			hideSidebar: function () {
				this.isSideMenuShown = false;
				this.activeTab = null;
			},
			showTab: function ( tabId ) {
				this.activeTab = tabId;
				this.isSideMenuShown = true;
			}
		}
	} );
};

window.onbeforeunload = function ( e ) {
	e = e || window.event;

	// For IE and Firefox prior to version 4
	if ( e ) {
		e.returnValue = 'Are you sure? Your playlist will be gone.';
	}

	// For Safari
	return 'Are you sure? Your playlist will be gone.';
};