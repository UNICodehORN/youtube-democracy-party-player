<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
/**
 * Configuration
 */

if (file_exists(__DIR__ . '/config/config.php')) {
    require_once __DIR__ . '/config/config.php';
}

if (!defined('PLAYLIST_FILENAME')) {
    define('PLAYLIST_FILENAME', "data/playlist.json");
}

const FILENAME = PLAYLIST_FILENAME;
/**
 * End Configuration
 * NO CHANGES BELOW!
 */

function createEmptyPlaylist(){
    if (!file_exists(FILENAME)) {
        $emptyPlaylist = [];
        saveToFile($emptyPlaylist);
    }
}

function saveToFile($content){
    $playlistFile = fopen(FILENAME, "w") or die("Unable to open file!");
    fwrite($playlistFile, json_encode($content));
    fclose($playlistFile);
}

function readFromFile(){
    $playlistFile = fopen(FILENAME, "r");
    $contents = fread($playlistFile, filesize(FILENAME));
    fclose($playlistFile);
    return json_decode($contents,true);
}
function isValidYoutubeId($id){
    if (!is_string($id)) {
        return false;
    }
    return preg_match('/^[a-zA-Z0-9_-]{11}$/', $id) === 1;
}

function addSongToPlaylist($title, $thumbnail, $id){
    if (!isValidYoutubeId($id)) {
        return false;
    }
    $title = is_string($title) ? trim($title) : '';
    $thumbnail = is_string($thumbnail) ? trim($thumbnail) : '';
    $playlist = readFromFile();
    if (!is_array($playlist)) {
        $playlist = [];
    }
    // Check if id is in playlist already
    foreach ($playlist as $song){
        if (isset($song["id"]) && $song["id"] == $id){
            return false;
        }
    }
    $playlist[] = ["title"=>$title, "thumbnail"=>$thumbnail, "id"=>$id, "votes"=>0];
    usort($playlist, function ($item1, $item2) {
        $votes1 = isset($item1['votes']) ? (int)$item1['votes'] : 0;
        $votes2 = isset($item2['votes']) ? (int)$item2['votes'] : 0;
        if ($votes1 == $votes2) {
            return 0;
        }
        return ($votes2 <=> $votes1);
    });
    saveToFile($playlist);
    return true;
}

function removeSongFromPlaylist($id){
    if (!isValidYoutubeId($id)) {
        return false;
    }
    $playlist = readFromFile();
    if (!is_array($playlist)) {
        $playlist = [];
    }
    $newPlaylist = [];
    foreach ($playlist as $song){
        if (isset($song["id"]) && $song["id"] != $id){
            $newPlaylist[] = $song;
        }
    }
    saveToFile($newPlaylist);
    return true;
}

// Create empty playlist if not existent
createEmptyPlaylist();

if (isset($_GET["id"]) && isset($_GET["thumbnail"]) && isset($_GET["title"])){
    addSongToPlaylist($_GET["title"], $_GET["thumbnail"], $_GET["id"]);
}
else if (isset($_GET["playVideo"])){
    removeSongFromPlaylist($_GET["playVideo"]);
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="description" content="">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- The above 4 meta tags *must* come first in the head; any other head content must come *after* these tags -->

    <!-- Title -->
    <title>YT Democracy Player</title>

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="assets/images/core-img/favicon.ico">
    <link rel="icon" type="image/png" href="assets/images/core-img/favicon.png">

    <!-- Stylesheet -->
    <link rel="stylesheet" href="assets/css/app.css">

</head>

<body>
    <!-- Preloader -->
    <div class="preloader d-flex align-items-center justify-content-center">
        <div class="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>

    <!-- ##### Header Area Start ##### -->
    <header class="header-area">
        <!-- Navbar Area -->
        <div class="vizew-main-menu" id="sticker">
            <div class="classy-nav-container breakpoint-off">
                <div class="container">

                    <!-- Menu -->
                    <nav class="classy-navbar justify-content-between" id="vizewNav">

                        <!-- Nav brand -->
                        <a href="index.php" class="nav-brand"><img src="assets/images/core-img/logo.png" style="filter: invert(100%);" width="300px" alt=""></a>

                        <!-- Navbar Toggler -->
                        <div class="classy-navbar-toggler">
                            <span class="navbarToggler"><span></span><span></span><span></span></span>
                        </div>

                        <div class="classy-menu">

                            <!-- Close Button -->
                            <div class="classycloseIcon">
                                <div class="cross-wrap"><span class="top"></span><span class="bottom"></span></div>
                            </div>

                            <!-- Nav Start -->
                            <div class="classynav">
                                <ul>
                                    <li class="active"><a href="index.php" data-i18n="nav.add">Add</a></li>
                                    <li><a href="vote.php" data-i18n="nav.vote">Vote</a></li>
                                    <li><a href="player.php" data-i18n="nav.player">Player</a></li>
                                </ul>
                            </div>
                            <!-- Nav End -->
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </header>
    <!-- ##### Header Area End ##### -->

    <!-- ##### Hero Area Start ##### -->
    <section class="hero--area section-padding-80">
        <div class="container">
            <div class="row no-gutters">
                <div class="col-12 col-md-7 col-lg-8">
                    <div class="tab-content">
                        <div class="tab-pane fade show active" id="post-1" role="tabpanel" aria-labelledby="post-1-tab">
                            <!-- Search Bar -->
                            <h4 data-i18n="search.heading">Search music video</h4>
                            <input id="searchQuery" name="query" data-i18n="search.placeholder" data-i18n-attr="placeholder" onkeydown="if(event.key==='Enter'){ event.preventDefault(); search(); }"/>
                            <input id="searchButton" type="button" value="Search" data-i18n="search.button" data-i18n-attr="value" onclick="search();"/>
                            <div id="results"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- ##### Hero Area End ##### -->

    <!-- ##### Footer Area Start ##### -->
    <footer class="footer-area">

        <!-- Copywrite Area -->
        <div class="copywrite-area">
            <div class="container">
                <div class="row align-items-center">
                    <!-- Copywrite Text -->
                    <div class="col-12 col-sm-6">
                        <p class="copywrite-text"><!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
Copyright &copy;<script>document.write(new Date().getFullYear());</script> <span data-i18n="footer.rights">All rights reserved | made with</span> <i class="fa fa-heart-o" aria-hidden="true"></i> <span data-i18n="footer.by">by</span> <a href="https://app.smartroot.de" target="_blank">Smartroot</a>
                    </div>
                    <!--<div class="col-12 col-sm-6">
                        <nav class="footer-nav">
                            <ul>
                                <li><a href="#">Advertise</a></li>
                                <li><a href="#">About</a></li>
                                <li><a href="#">Contact</a></li>
                                <li><a href="#">Disclaimer</a></li>
                                <li><a href="#">Privacy</a></li>
                            </ul>
                        </nav>
                    </div>-->
                </div>
            </div>
        </div>
    </footer>
    <!-- ##### Footer Area End ##### -->

    <!-- ##### All Javascript Script ##### -->
    <!-- jQuery-2.2.4 js -->
    <script src="assets/js/jquery/jquery-2.2.4.min.js"></script>
    <!-- Popper js -->
    <script src="assets/js/bootstrap/popper.min.js"></script>
    <!-- Bootstrap js -->
    <script src="assets/js/bootstrap/bootstrap.min.js"></script>
    <!-- All Plugins js -->
    <script src="assets/js/plugins/plugins.js"></script>
    <!-- Active js -->
    <script src="assets/js/active.js"></script>
    <!-- Youtube Player -->
    <script src="assets/js/youtube.js"></script>

</body>

</html>
