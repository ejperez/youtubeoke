function decodeEntity(inputStr) {
  var textarea = document.createElement("textarea");
  textarea.innerHTML = inputStr;
  return textarea.value;
}

window.onload = function () {
  if (!("Vue" in window)) {
    return;
  }

  const { createApp } = Vue;

  createApp({
    computed() {
      return {
        playlistCount() {
          return this.playlist.length;
        },
      };
    },
    data() {
      return {
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
        },
      };
    },
    mounted() {
      var vm = this;

      vm.formData.q = "karaoke";
      vm.searchSong();

      // Create Youtube iFrame API instance
      this.player = new YT.Player("player", {
        height: "390",
        width: "640",
        events: {
          onReady() {
            vm.showOverlay = false;
          },
          onStateChange(event) {
            if (event.data == YT.PlayerState.ENDED) {
              var nextSong = vm.playlist.shift();

              if (nextSong) {
                vm.playSong(nextSong);
              } else {
                vm.currentSong = null;
              }
            }
          },
        },
        playerVars: {
          rel: 0,
          showinfo: 0,
        },
      });

      window.addEventListener("resize", vm.resizeList);
      vm.resizeList();
    },
    methods: {
      addToPlaylist(item) {
        this.playlist.push(item);
      },
      searchSong() {
        var vm = this;

        vm.isLoading = true;

        fetch(
          "https://ejpentertainment.000webhostapp.com?q=" +
            encodeURIComponent(this.formData.q)
        )
          .then((response) => response.json())
          .then((data) => {
            vm.searchResults = [];

            if ("items" in data && data.items.length > 0) {
              data.items.forEach(function (item) {
                vm.searchResults.push({
                  id: item.id.videoId,
                  title: decodeEntity(item.snippet.title),
                  channel: item.snippet.channelTitle,
                  image: item.snippet.thumbnails.medium.url,
                });
              });
            }

            vm.isLoading = false;
            vm.isSideMenuShown = true;
          })
          .catch((e) => console.debug(e));
      },
      playSongFromPlaylist(song, index) {
        this.deleteSong(index);
        this.playSong(song);
      },
      playSong(song) {
        this.currentSong = song;

        this.player.loadVideoById({
          videoId: song.id,
          rel: 0,
        });

        this.showPlayer = true;
      },
      deleteSong(index) {
        this.playlist.splice(index, 1);
      },
      showTab(tabId) {
        this.activeTab = tabId;
        var list = null;

        if (tabId === 1) {
          list = document.getElementById("js-search-list");
        } else if (tabId === 2) {
          list = document.getElementById("js-play-list");
        }

        if (list !== null) {
          setTimeout(function () {
            list.scrollTop = 0;
          }, 100);
        }
      },
      resizeList() {
        this.searchListHeight = window.innerHeight - 150;
        this.playListHeight = window.innerHeight - 98;
        this.logoMarginTop = window.innerHeight / 2 - 160;
      },
    },
  }).mount("#app");
};
