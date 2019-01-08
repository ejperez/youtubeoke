window.onload = function () {
	var app = new Vue( {
		el: '#wrapper',
		computed: {
			playlistCount: function () {
				return this.playlist.length;
			}
		},
		data: {
			showOverlay: true,
			isSideMenuShown: false,
			isLoading: false,
			activeTab: 1,

			// CSS properties
			searchListHeight: 0,
			playListHeight: 0,
			logoMarginTop: 0,

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
			var vm = this;

			vm.formData.q = 'karaoke';
			vm.searchSong();

			// Create Youtube iFrame API instance
			this.player = new YT.Player( 'player', {
				height: '390',
				width: '640',
				events: {
					'onReady': function () {
						vm.showOverlay = false;
					},
					'onStateChange': function ( event ) {
						if ( event.data == YT.PlayerState.ENDED ) {

							var nextSong = vm.playlist.shift();

							if ( nextSong ) {
								vm.playSong( nextSong );
							} else {
								vm.currentSong = null;
							}
						}
					}
				},
				playerVars: {
					rel: 0,
					showinfo: 0
				}
			} );

			window.addEventListener( 'resize', vm.resizeList );
			vm.resizeList();
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
					vm.searchResults = [];

					if ( response.data.hasOwnProperty( 'items' ) && response.data.items.length > 0 ) {
						response.data.items.forEach( function ( item ) {
							vm.searchResults.push( {
								id: item.id.videoId,
								title: item.snippet.title,
								channel: item.snippet.channelTitle,
								image: item.snippet.thumbnails.medium.url
							} );
						} );
					}

					vm.isLoading = false;
					vm.isSideMenuShown = true;
				} );
			},
			playSongFromPlaylist: function ( song, index ) {
				this.deleteSong( index );
				this.playSong( song );
			},
			playSong: function ( song ) {

				this.currentSong = song;

				this.player.loadVideoById( {
					videoId: song.id,
					rel: 0
				} );

				this.showPlayer = true;
			},
			deleteSong: function ( index ) {
				this.playlist.splice( index, 1 );
			},
			showTab: function ( tabId ) {
				this.activeTab = tabId;
				var list = null;

				if ( tabId === 1 ) {
					list = document.getElementById( 'js-search-list' );
				} else if ( tabId === 2 ) {
					list = document.getElementById( 'js-play-list' );
				}

				if ( list !== null ) {
					setTimeout( function () {
						list.scrollTop = 0;
					}, 100 );
				}
			},
			resizeList: function () {
				this.searchListHeight = window.innerHeight - 150;
				this.playListHeight = window.innerHeight - 98;
				this.logoMarginTop = window.innerHeight / 2 - 160;
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