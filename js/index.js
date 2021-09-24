var g_keys;
var g_audio;
var g_id;
$(function() {

    g_audio = $('audio')[0];
    g_audio.onended = () => {
        randomAudio();
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
    loadId(g_keys[randNum(1, g_keys.length)]);
}

function loadId(id) {
    g_id = id;
    var data = g_data[id];
    document.title = data.title;
    $('h3').html(data.title);
    $('h5').html(data.user);
    g_audio.src = 'https://file.koe-koe.com/sound/upload/' + id + '.mp3';
}