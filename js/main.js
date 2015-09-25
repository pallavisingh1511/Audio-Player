var audio;

//Hide Pause Button
$('#pause').hide();

//Select the first song in the list on load of the player
initAudio($('#playlist li:first-child'));

function initAudio(element){
    var song = element.attr('song');
    var title = element.text();
    var cover = element.attr('cover');
    var artist = element.attr('artist');
    
    //Create audio object, taking song name as 
    
    audio = new Audio('media/' + song);
    
    //Insert audio info
    $('.artist').text(artist);
    $('.title').text(title);
    
    //Insert song cover image
    $('img.cover').attr('src','images/covers/' + cover);
    
    $('#playlist li').removeClass('active');
    element.addClass('active');
    
}

//Play button : To play a song
$('#play').click(function(){
    audio.play();
    $('#play').hide();
    $('#pause').show();
    showDuration();
});

//Pause button : To pause a song
$('#pause').click(function(){
    audio.pause();
    $('#pause').hide();
    $('#play').show();
});

//Stop button : To stop a song
$('#stop').click(function(){
    audio.pause();
    audio.currentTime = 0;
    $('#pause').hide();
    $('#play').show();
});

//To play the next song in the playlist (for the last song it will play the first song)
$('#next').click(function(){
    audio.pause();
    var next = $('#playlist li.active').next();
    if(next.length == 0){
        next = $('#playlist li:first-child');
    }
    $('#pause').show();
    $('#play').hide();
    initAudio(next);
    audio.play();
    showDuration();
});

//To play the previous song in the playlist (for the first song it will play the last song)
$('#previous').click(function(){
    audio.pause();
    var previous = $('#playlist li.active').prev();
    if(previous.length == 0){
        previous = $('#playlist li:last-child');
    }
   
    $('#pause').show();
    $('#play').hide();
    initAudio(previous);
    audio.play();
    showDuration();
});

//To play songs when clicked on in the playlist
$('#playlist li').click(function(){
    audio.pause();    
    initAudio($(this));
    $('#play').hide();
    $('#pause').show();
    showDuration();
    audio.play();   
});

//To control the volume level
$('#volume').change(function(){
    audio.volume = parseFloat(this.value / 10);
});

//To display the time passed and the progress bar while a song plays
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
            value = (100 / audio.duration) * audio.currentTime;              
        }

        $('#progress-bar').css('width', value + '%');
    });
}