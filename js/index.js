var g_keys;
var g_audio;
var g_id;
var g_type;
var g_updated = false;
$(function() {
		document.addEventListener('touchstart', function () {
		    if(g_audio.readyState == 4 && g_audio.paused){
		    	g_audio.play();
		    }
		});
    g_audio = $('audio')[0];
     g_audio.onplay = () => {
        if(!g_updated){
            g_updated = true;
             $.getJSON('https://neysummer-api.glitch.me/koekoe.php', { id: id }, function(json, textStatus) {
                if (textStatus == 'success') {
                    console.log(json);
                }
            });
        }
    }
    g_audio.onended = () => {
        if($('#loop').prop('checked')){
            return g_audio.play();
        }
        var c = $('#sleep').val();
        if(c > 0){
            c--;
            $('#sleep').val(c);
            if(c > 0){
                randomAudio();
            }
        }
    }

    g_audio.onerror = () => {
        if (g_type == 'upload') {
            g_type = 'old';
            loadId();
        } else {
            randomAudio();
        }
    }

    if (!g_data) {
        $.getJSON('./data.json', function(json, textStatus) {
            if (textStatus == 'success') {
                g_data = json;
                local_saveJson('data', g_data);
                initData();
            }
        });
    } else {
        initData();
    }
})

function initData() {
    g_keys = Object.keys(g_data);
    randomAudio();

}

function randomAudio() {
    g_type = 'upload';
    g_updated = false;
    var id = g_keys[randNum(1, g_keys.length)];
    loadId(id);
   
}

function loadId(id) {
    if (!id) {
        id = g_id;
    } else {
        g_id = id;
    }
    var data = g_data[id];
    document.title = data.title;
    $('h3').html(data.title);
    $('h5').html(data.user);
    g_audio.src = 'https://file.koe-koe.com/sound/' + g_type + '/' + id + '.mp3';
}