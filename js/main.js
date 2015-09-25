var audio = new Audio('media/01. Grenade.mp3');

//Hide Pause
$('#pause').hide();

//Play button
$('#play').click(function(){
    audio.play();
    $('#play').hide();
    $('#pause').show();
    showDuration();
});

//Pause button
$('#pause').click(function(){
    audio.pause();
    $('#pause').hide();
    $('#play').show();
});

//Stop button
$('#stop').click(function(){
    audio.pause();
    audio.currentTime = 0;
    $('#pause').hide();
    $('#play').show();
});

//Volume Control
$('#volume').change(function(){
    audio.volume = parseFloat(this.value / 10);
});

//Time/Duration
function showDuration(){
    $(audio).bind('timeupdate',function(){
    //Get hours and minutes
        var s = parseInt(audio.currentTime % 60);
        var m = parseInt(audio.currentTime / 60) % 60;
        if(s < 10){
            s = '0' + s;
        }
        $('#duration').html(m + ':' + s);
        var value = 0;
        if(audio.currentTime > 0 ){
            value = Math.floor((100 / audio.duration) * audio.currentTime);              
        }

        $('#progress').css('width', value + '%');
    });
}