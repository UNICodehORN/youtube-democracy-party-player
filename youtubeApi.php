<?php
/**
 * YouTube API integration
 */
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

require_once __DIR__ . '/vendor/autoload.php';

// Load configuration
$configFile = __DIR__ . '/config/config.php';
if (file_exists($configFile)) {
    require_once $configFile;
} else {
    $exampleConfig = __DIR__ . '/config/config.example.php';
    if (file_exists($exampleConfig)) {
        require_once $exampleConfig;
    }
}

if (!defined('YOUTUBE_API_KEY') || YOUTUBE_API_KEY === 'YOUR_YOUTUBE_API_KEY_HERE') {
    http_response_code(500);
    echo json_encode(['error' => 'YouTube API key not configured.']);
    exit;
}

$client = new Google_Client();
$client->setApplicationName('YT Democracy Player');

$client->setDeveloperKey(YOUTUBE_API_KEY);

$service = new Google_Service_YouTube($client);
$query = "";
if (isset($_GET["q"])) {
    $query = $_GET["q"];
}
if (is_string($query)) {
    $query = trim($query);
} else {
    $query = '';
}

$queryParams = [
    'maxResults' => 10,
    'q' => $query,
    'type' => 'video',
    'videoCategoryId' => '10'
];

if ($query === '') {
    echo json_encode([]);
    exit;
}

try {
    $response = $service->search->listSearch('snippet', $queryParams);
    $results = [];
    foreach ($response as $video) {
        if (!isset($video["id"]["videoId"])) {
            continue;
        }
        $results[] = [
            "title" => isset($video["snippet"]["title"]) ? $video["snippet"]["title"] : '',
            "id" => $video["id"]["videoId"],
            "thumbnail" => isset($video["snippet"]["thumbnails"]["default"]["url"]) ? $video["snippet"]["thumbnails"]["default"]["url"] : ''
        ];
    }
    echo json_encode($results);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'YouTube API request failed.']);
}
?>
