var translations = {
    en: {
        "nav.add": "Add",
        "nav.vote": "Vote",
        "nav.player": "Player",
        "search.heading": "Search music video",
        "search.placeholder": "Search YouTube for a song",
        "search.button": "Search",
        "search.enterTerm": "Enter a search term.",
        "search.searching": "Searching...",
        "search.noResults": "No results.",
        "search.addToPlaylist": "Add to playlist",
        "player.mainLabel": "Current song and upcoming videos",
        "player.qrPromptLabel": "Scan the QR code to vote or add songs",
        "player.promptTitle": "Your music, your choice",
        "player.promptText": "Vote or add songs now",
        "player.timeLabel": "Next up in:",
        "player.nextHeading": "Coming up",
        "player.nextLabel": "The next two videos",
        "player.sidebarLabel": "QR code and more songs",
        "player.qrText": "Scan the QR code to vote or add songs",
        "player.qrAlt": "QR code for voting or adding songs",
        "player.moreHeading": "More songs",
        "player.playlistLabel": "More songs in the playlist",
        "vote.heading": "Current playlist",
        "playlist.noSongs": "No songs in the playlist.",
        "playlist.vote": "Vote",
        "playlist.votes": "Votes",
        "toast.newSong": "New song added: \"{title}\"",
        "toast.newTopSong": "New top song: \"{title}\"",
        "toast.enterTerm": "Enter a search term",
        "toast.voteAdded": "Vote added",
        "toast.invalidVote": "Invalid vote",
        "toast.invalidVideo": "Invalid video",
        "toast.adding": "Adding to playlist...",
        "toast.added": "Added to playlist",
        "footer.rights": "All rights reserved | made with",
        "footer.by": "by"
    },
    de: {
        "nav.add": "Hinzufügen",
        "nav.vote": "Abstimmen",
        "nav.player": "Player",
        "search.heading": "Musikvideo suchen",
        "search.placeholder": "YouTube nach einem Song durchsuchen",
        "search.button": "Suchen",
        "search.enterTerm": "Bitte einen Suchbegriff eingeben.",
        "search.searching": "Suche läuft...",
        "search.noResults": "Keine Ergebnisse gefunden.",
        "search.addToPlaylist": "Zur Playlist hinzufügen",
        "player.mainLabel": "Aktueller Song und nächste Videos",
        "player.qrPromptLabel": "Scanne den QR-Code zum Abstimmen oder Hinzufügen von Songs",
        "player.promptTitle": "Deine Musik, deine Wahl",
        "player.promptText": "Jetzt abstimmen oder Songs hinzufügen",
        "player.timeLabel": "Nächster Song in:",
        "player.nextHeading": "Als Nächstes",
        "player.nextLabel": "Die nächsten zwei Videos",
        "player.sidebarLabel": "QR-Code und weitere Songs",
        "player.qrText": "Scanne den QR-Code, um abzustimmen oder Songs hinzuzufügen",
        "player.qrAlt": "QR-Code zum Abstimmen oder Hinzufügen von Songs",
        "player.moreHeading": "Weitere Songs",
        "player.playlistLabel": "Weitere Songs in der Playlist",
        "vote.heading": "Aktuelle Playlist",
        "playlist.noSongs": "Keine Songs in der Playlist.",
        "playlist.vote": "Stimme",
        "playlist.votes": "Stimmen",
        "toast.newSong": "Neuer Song hinzugefügt: „{title}“",
        "toast.newTopSong": "Neuer Top-Song: „{title}“",
        "toast.enterTerm": "Bitte einen Suchbegriff eingeben",
        "toast.voteAdded": "Stimme abgegeben",
        "toast.invalidVote": "Ungültige Abstimmung",
        "toast.invalidVideo": "Ungültiges Video",
        "toast.adding": "Song wird zur Playlist hinzugefügt...",
        "toast.added": "Song zur Playlist hinzugefügt",
        "footer.rights": "Alle Rechte vorbehalten | mit",
        "footer.by": "von"
    }
};

var language = (navigator.language || navigator.userLanguage || "en").toLowerCase().indexOf("de") === 0 ? "de" : "en";

function t(key, values) {
    var message = translations[language][key] || translations.en[key] || key;
    if (values) {
        Object.keys(values).forEach(function (name) {
            message = message.replace("{" + name + "}", values[name]);
        });
    }
    return message;
}

function formatVotes(count) {
    var numericCount = Number(count);
    var label = numericCount === 1 ? t("playlist.vote") : t("playlist.votes");
    return escapeHtml(count) + " " + label;
}

function applyTranslations() {
    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n]").forEach(function (element) {
        var key = element.getAttribute("data-i18n");
        var attribute = element.getAttribute("data-i18n-attr");
        if (attribute) {
            element.setAttribute(attribute, t(key));
        } else if (!element.hasAttribute("data-i18n-aria-label") && !element.hasAttribute("data-i18n-alt")) {
            element.textContent = t(key);
        }
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (element) {
        element.setAttribute("aria-label", t(element.getAttribute("data-i18n")));
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (element) {
        element.setAttribute("alt", t(element.getAttribute("data-i18n")));
    });
}

applyTranslations();

function escapeHtml(text) {
    if (text == null) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function isValidYoutubeId(id) {
    return typeof id === 'string' && /^[a-zA-Z0-9_-]{11}$/.test(id);
}

function showToast(msg, type) {
    if (type === undefined) type = 'success';
    if ($('#toast-container').length === 0) {
        $('body').append('<div id="toast-container"></div>');
    }
    var toast = $('<div class="toast toast-' + escapeHtml(type) + '">' + escapeHtml(msg) + '</div>');
    $('#toast-container').append(toast);
    setTimeout(function() {
        toast.addClass('show');
    }, 10);
    setTimeout(function() {
        toast.removeClass('show');
        setTimeout(function() {
            toast.remove();
        }, 300);
    }, 3000);
}

function generateQRCode() {
    var qrImages = $('#qr-code, #fullscreen-qr-code');
    if (qrImages.length === 0) return;
    var url = new URL('vote.php', window.location.href).href;
    qrImages.attr('src', 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(url));
}

// 2. This code loads the IFrame Player API code asynchronously.
function initPlayer() {
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

//Good times SM3RHgYZ2Eg
//Monde quilsillumine p0VAkGsTyjM
//Ready for kdJmnolEVzk
//Bad life o4552tadeuM

function loadPlaylistFromLocalStorage() {
    let videos = JSON.parse(localStorage.getItem("yt_playlist"))["videos"];
    //localStorage.removeItem("yt_playlist");
    for (let i = 0; i < videos.length; i++) {
        addItemToPlayList(videos[i]["title"], videos[i]["thumbnail"], videos[i]["id"]);
    }
}

let initalLoad = true;
let lastUpdate = -1;
let previousPlaylistIds = null;
let previousTopVideoId = null;

function fetchHeader(url, wch) {
    try {
        var req = new XMLHttpRequest();
        req.open("HEAD", url, false);
        req.send(null);
        if (req.status == 200) {
            return req.getResponseHeader(wch);
        } else return false;
    } catch (er) {
        return er.message;
    }
}


function loadPlaylist(playlistFile = "data/playlist.json") {
    let lastModification = fetchHeader(playlistFile,'Last-Modified');
    if (lastModification != lastUpdate) {
        lastUpdate = lastModification;
        $.get(playlistFile, function (playlist) {
            emptyPlaylist();
            let isInitialLoad = initalLoad;
            let queue = playlist;
            if (isInitialLoad && playlist.length > 0) {
                startPlayer(playlist[0]["id"]);
                httpGet("index.php?playVideo=" + playlist[0]["id"], function () {});
                initalLoad = false;
                queue = playlist.slice(1);
            }

            let playlistIds = playlist.map(function (video) { return video["id"]; });
            if (previousPlaylistIds !== null) {
                playlist.forEach(function (video) {
                    if (previousPlaylistIds.indexOf(video["id"]) === -1) {
                        showToast(t("toast.newSong", {title: video["title"]}), "info");
                    }
                });
                if (queue.length > 0 && queue[0]["id"] !== previousTopVideoId) {
                    showToast(t("toast.newTopSong", {title: queue[0]["title"]}), "success");
                }
            }
            previousPlaylistIds = playlistIds;
            previousTopVideoId = queue.length > 0 ? queue[0]["id"] : null;

            for (let i = 0; i < queue.length; i++) {
                let target = i < 2 ? "#next-videos-left" : "#playlist";
                addItemToPlayList(queue[i]["title"], queue[i]["thumbnail"], queue[i]["id"], queue[i]["votes"], target);
            }
        })
    }
}

function loadNewPlaylist(playlistFile = "data/fallback_playlist.json") {
        $.get(playlistFile, function (playlist) {
            console.log("loaded");
            console.log(playlist);
            emptyPlaylist();
            playlist = playlist.sort((a, b) => 0.5 - Math.random());
            previousPlaylistIds = playlist.map(function (video) { return video["id"]; });
            previousTopVideoId = previousPlaylistIds.length > 0 ? previousPlaylistIds[0] : null;
            for (let i = 0; i < playlist.length; i++) {
              let target = i < 2 ? "#next-videos-left" : "#playlist";
              addItemToPlayList(playlist[i]["title"], playlist[i]["thumbnail"], playlist[i]["id"], playlist[i]["votes"], target);
            }
            playNext();
        })
}
function emptyPlaylist() {
    $("#playlist").html("");
    $("#next-videos-left").html("");
}

function onYouTubeIframeAPIReady() {
    console.log("player ready");
    generateQRCode();
    loadPlaylist("data/playlist.json");
}

function startPlayer(id) {
    if (!isValidYoutubeId(id)) {
        return;
    }
    if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
        setTimeout(function() { startPlayer(id); }, 500);
        return;
    }
    if (player && typeof player.destroy === 'function') {
        try {
            player.destroy();
        } catch (e) {}
    }
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: id,
        playerVars: {
            'playsinline': 1,
            'controls': 1,
            'disablekb': 0,
            'modestbranding': 1,
            'rel': 0,
            'autoplay': 1,
            'mute': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
    setTimeout(function () {
        try {
            if (player && typeof player.playVideo === 'function') {
                player.playVideo();
            }
        } catch (e) {}
        console.log("start");
    }, 1000);

    setTimeout(updateStatus, 2000);
    generateQRCode();
}

let lastSecond = -1
let seenTimes = 0

function updateStatus() {
    let calc = player.getDuration() - player.getCurrentTime();
    let minutes = Math.floor(calc / 60);
    let seconds = Math.round(calc - minutes * 60);
    $("#time-left").html(pad(minutes, 2) + ":" + pad(seconds, 2));

    //Deadlock
    if (lastSecond == seconds) {
        seenTimes++;
    } else {
        seenTimes = 0;
        lastSecond = seconds;
    }

    if (Math.round(minutes + seconds) == 0 && seenTimes > 5) {
        playNext();
    } else if (minutes == 0 && seconds < 50) {
        exitFullScreen();
    } else if (minutes%2 == 0) {
        exitFullScreen();
    } else if (minutes%2 != 0) {
        playFullscreen();
    }

    loadPlaylist();

    setTimeout(updateStatus, 1000);
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    try {
        if (player && typeof player.playVideo === 'function') {
            player.playVideo();
        }
    } catch (e) {}
}

function addItemToPlayList(title, thumbnail, id, votes = 0, target = "#playlist") {
    if (!isValidYoutubeId(id)) {
        return;
    }
    let safeTitle = escapeHtml(title);
    let safeThumbnail = escapeHtml(thumbnail);
    let safeId = escapeHtml(id);
    let itemClass = target === "#next-videos-left" ? "nav-item queue-preview" : "nav-item";
    let elem = $("<li id='video-" + safeId + "' class=\"" + itemClass + "\" onclick=\"playNewVideo('" + safeId + "');\">\n" +
        "            <!-- New Video -->\n" +
        "            <div class=\"single-blog-post style-2 d-flex align-items-center\">\n" +
        "                <div class=\"post-thumbnail\" style='width:30%'>\n" +
        "                    <img src=\"" + safeThumbnail + "\" alt=\"\">\n" +
        "                </div>\n" +
        "                <div class=\"post-content\" style='width:70%'>\n" +
        "                    <h6 class=\"post-title\">" + safeTitle + "</h6>\n" +
        "                    <div class=\"post-meta d-flex justify-content-between\">\n" +
        "                        <span><i class=\"fa fa-thumbs-o-up\" aria-hidden=\"true\"></i> " + formatVotes(votes) + "</span>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "    </li>");
    $(target).append(elem);
}

function playNext() {
    let nextVideo = $("#next-videos-left").children()[0] || $("#playlist").children()[0];
    if (nextVideo) {
        nextVideo.click();
        setTimeout(playFullscreen, 8000);
    }
    else{
        loadNewPlaylist();
    }
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        //setTimeout(stopVideo, 10000);
        done = true;
    }
}

function exitFullScreen() {
    console.log("exit fullscreen");
    $(".player-stage").removeClass("fullscreen");
}

function playNewVideo(id) {
    if (!isValidYoutubeId(id)) {
        return;
    }
    httpGet("index.php?playVideo=" + encodeURIComponent(id), function (videos) {
        if (typeof player !== 'undefined' && player && typeof player.loadVideoById === 'function') {
            player.loadVideoById(id);
        }
        $("#video-" + id).remove();
    });
}

function playFullscreen() {
    console.log("enter fullscreen");
    $(".player-stage").addClass("fullscreen");
}

function stopVideo() {
    player.stopVideo();
}

function removeSpecialChars(title){
    return title.replace(/[^a-zA-Z ]/g, "");
}
function search() {
    let query = $("#searchQuery").val();
    if (query === undefined || query === null) {
        query = '';
    }
    query = String(query).trim();
    if (query === '') {
        $("#results").html("<p>" + escapeHtml(t("search.enterTerm")) + "</p>");
        showToast(t("toast.enterTerm"), "info");
        return;
    }
    $("#results").html("<p>" + escapeHtml(t("search.searching")) + " <span class='spinner'></span></p>");
    $("#searchButton").prop('disabled', true);
    httpGet("youtubeApi.php?q=" + encodeURIComponent(query), function (videos) {
        $("#searchButton").prop('disabled', false);
        $("#results").html("");
        if (!Array.isArray(videos) || videos.length === 0) {
            $("#results").html("<p>" + escapeHtml(t("search.noResults")) + "</p>");
            return;
        }
        videos.forEach((element) => {
            let id = element["id"];
            let thumbnail = element["thumbnail"];
            let title = element["title"];
            if (!isValidYoutubeId(id)) {
                return;
            }
            let safeTitle = escapeHtml(title);
            let safeThumbnail = escapeHtml(thumbnail);
            let safeId = escapeHtml(id);
            let elem = $("<li id='video-" + safeId + "' class=\"nav-item\">\n" +
                "            <!-- New Video -->\n" +
                "            <div class=\"single-blog-post style-2 d-flex align-items-center\">\n" +
                "                <div class=\"post-thumbnail\" style='width:30%'>\n" +
                "                    <img src=\"" + safeThumbnail + "\" alt=\"\">\n" +
                "                </div>\n" +
                "                <div class=\"post-content\" style='width:70%'>\n" +
                "                    <h6 class=\"post-title\">" + safeTitle + "</h6>\n" +
                "                    <div class=\"post-meta d-flex justify-content-between\">\n" +
                "                        <a href='#'><i class=\"fa fa-plus-circle\" aria-hidden=\"true\"></i> " + escapeHtml(t("search.addToPlaylist")) + "</a>\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "            </div>\n" +
                "    </li>");
            elem.on("click", function (event) {
                event.preventDefault();
                addVideo(title, thumbnail, id);
            });
            $("#results").append(elem);
        });
    });
}

function vote(id){
    if (!isValidYoutubeId(id)) {
        showToast(t("toast.invalidVote"), "error");
        return;
    }
    var card = $("#video-" + escapeHtml(id));
    card.addClass("vote-clicked");
    setTimeout(function() { card.removeClass("vote-clicked"); }, 300);
    httpGet("vote.php?vote=" + encodeURIComponent(id), function (videos) {
        showToast(t("toast.voteAdded"), "success");
        refreshVoting();
    });
}
function refreshVoting(playlistFile = "data/playlist.json") {
    $.get(playlistFile, function (videos) {
        $("#playlist").html("");
        if (!Array.isArray(videos) || videos.length === 0) {
            $("#playlist").html("<p>" + escapeHtml(t("playlist.noSongs")) + "</p>");
            return;
        }
        videos.forEach((element, index) => {
            let id = element["id"];
            let thumbnail = element["thumbnail"];
            let title = element["title"];
            let votes = element["votes"];
            if (!isValidYoutubeId(id)) {
                return;
            }
            let safeTitle = escapeHtml(title);
            let safeThumbnail = escapeHtml(thumbnail);
            let safeId = escapeHtml(id);
            let rank = index + 1;
            let rankClass = '';
            if (rank === 1) rankClass = 'rank-1';
            else if (rank === 2) rankClass = 'rank-2';
            else if (rank === 3) rankClass = 'rank-3';
            let elem = $("<div id='video-" + safeId + "' class=\"nav-item\" onclick=\"vote('" + safeId + "');\" style=\"margin-bottom:10px;\">\n" +
                "            <!-- New Video -->\n" +
                "            <div class=\"single-blog-post style-2 d-flex align-items-center\">\n" +
                "                <div class=\"rank-badge " + rankClass + "\">" + rank + "</div>\n" +
                "                <div class=\"post-thumbnail\" style='width:30%'>\n" +
                "                    <img src=\"" + safeThumbnail + "\" alt=\"\">\n" +
                "                </div>\n" +
                "                <div class=\"post-content\" style='width:70%'>\n" +
                "                    <h6 class=\"post-title\">" + safeTitle + "</h6>\n" +
                "                    <div class=\"post-meta d-flex justify-content-between\">\n" +
                "                        <a href='#'><i class=\"fa fa-thumbs-up\" aria-hidden=\"true\"></i> " + formatVotes(votes) + "</a>\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "            </div>\n" +
                "    </div>");
            $("#playlist").append(elem);
        });
    }, "json");
}

function addVideoLocalStorage(title, thumbnail, id) {
    let playlist = localStorage.getItem("yt_playlist");
    if (playlist == null) {
        playlist = "{ \"videos\": []}";
    }
    videos = JSON.parse(playlist)["videos"];
    console.log(videos);
    console.log(videos.length);
    videosNew = "";
    for (let i = 0; i < videos.length; i++) {
        videosNew += "{ \"id\": \"" + videos[i]["id"] + "\", \"title\": \"" + videos[i]["title"] + "\", \"thumbnail\": \"" + videos[i]["thumbnail"] + "\"},"
    }
    localStorage.setItem("yt_playlist", "{ \"videos\": [" + videosNew + " { \"id\": \"" + id + "\", \"title\": \"" + title + "\", \"thumbnail\": \"" + thumbnail + "\"} ]}");
}

function addVideo(title, thumbnail, id) {
    if (!isValidYoutubeId(id)) {
        showToast(t("toast.invalidVideo"), "error");
        return;
    }
    let safeTitle = encodeURIComponent(title);
    let safeThumbnail = encodeURIComponent(thumbnail);
    let safeId = encodeURIComponent(id);
    showToast(t("toast.adding"), "info");
    httpGet("index.php?title=" + safeTitle + "&thumbnail=" + safeThumbnail + "&id=" + safeId, function (videos) {
        showToast(t("toast.added"), "success");
    });
}

function httpGet(url, callback, silentErrors) {
    if (silentErrors === undefined) {
        silentErrors = false;
    }
    $.ajax({
        type: "GET",
        url: url,
        cache: false,
        dataType: "text",
        success: function (msg) {
            let response = null;
            try {
                response = JSON.parse(msg);
            } catch (e) {
                response = msg;
            }
            if (typeof callback === 'function') {
                callback(response);
            }
        },
        error: function (xhr, status, error) {
            if (!silentErrors) {
                console.error('Request failed:', url, error);
            }
        }
    });
}
