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

<body onload="initPlayer();">
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
                                    <li><a href="index.php" data-i18n="nav.add">Add</a></li>
                                    <li><a href="vote.php" data-i18n="nav.vote">Vote</a></li>
                                    <li class="active"><a href="player.php" data-i18n="nav.player">Player</a></li>
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
        <div class="container player-container">
            <div class="player-layout">
                <section class="player-column player-main" aria-label="Current song and upcoming videos" data-i18n="player.mainLabel" data-i18n-aria-label>
                    <div class="player-stage">
                        <div id="player" class="yt-fs single-feature-post video-post bg-img"></div>
                        <div class="fullscreen-qr-prompt" aria-label="Scan the QR code to vote or add songs" data-i18n="player.qrPromptLabel" data-i18n-aria-label>
                            <img id="fullscreen-qr-code" src="" alt="QR code for voting" data-i18n="player.qrAlt" data-i18n-alt>
                            <div>
                                <strong data-i18n="player.promptTitle">Your music, your choice</strong>
                                <span data-i18n="player.promptText">Vote or add songs now</span>
                            </div>
                        </div>
                    </div>
                    <div class="time-banner">
                        <h4><span data-i18n="player.timeLabel">Next up in:</span> <span id="time-left">00:00</span></h4>
                    </div>
                    <div class="next-videos-section">
                        <h4 data-i18n="player.nextHeading">Coming up</h4>
                        <ul id="next-videos-left" class="next-videos-list" aria-label="The next two videos" data-i18n="player.nextLabel" data-i18n-aria-label></ul>
                    </div>
                </section>

                <aside class="player-column player-sidebar" aria-label="QR code and more songs" data-i18n="player.sidebarLabel" data-i18n-aria-label>
                    <div class="qr-panel">
                        <p data-i18n="player.qrText">Scan the QR code to vote or add songs</p>
                        <img id="qr-code" src="" alt="QR code for voting or adding songs" data-i18n="player.qrAlt" data-i18n-alt>
                    </div>
                    <h4 data-i18n="player.moreHeading">More songs</h4>
                    <ul id="playlist" class="nav vizew-nav-tab" role="list" aria-label="More songs in the playlist" data-i18n="player.playlistLabel" data-i18n-aria-label></ul>
                </aside>
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
