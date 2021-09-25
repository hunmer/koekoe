<?php
	header('Access-Control-Allow-Origin: *');
	if(!file_exists('koekoe.json')){
		$json = [];
	}else{
		$json = json_decode(file_get_contents('koekoe.json'), true);
	}
	$id = $_GET['id'];
	if(!$id) return;
	$ip = getString_left(getIp(), ',');
	if($ip == '' || $ip == null) return;
	if(!isset($json[$ip])){
		$json[$ip] = [];
	}
	date_default_timezone_set('Asia/ShangHai');
	$json[$ip][$id] = date('Y-m-d H:i:s');
		file_put_contents('koekoe.json', json_encode($json));
	echo json_encode([ip => $ip]);
	exit();
	
function getString_left($s_text, $s_search){
	if(($i_start = strpos($s_text, $s_search, $i_start)) !== false){
		return substr($s_text, 0, $i_start);
	}
	return $s_text;
}

function getIp()
{
    if ($_SERVER["HTTP_CLIENT_IP"] && strcasecmp($_SERVER["HTTP_CLIENT_IP"], "unknown")) {
        $ip = $_SERVER["HTTP_CLIENT_IP"];
    } else {
        if ($_SERVER["HTTP_X_FORWARDED_FOR"] && strcasecmp($_SERVER["HTTP_X_FORWARDED_FOR"], "unknown")) {
            $ip = $_SERVER["HTTP_X_FORWARDED_FOR"];
        } else {
            if ($_SERVER["REMOTE_ADDR"] && strcasecmp($_SERVER["REMOTE_ADDR"], "unknown")) {
                $ip = $_SERVER["REMOTE_ADDR"];
            } else {
                if (isset ($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'],
                        "unknown")
                ) {
                    $ip = $_SERVER['REMOTE_ADDR'];
                }
            }
        }
    }
    return $ip;
}

