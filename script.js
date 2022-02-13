$(document).ready(() => {
    //document.getElementById("gift-close").click()

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    //var player;
    let returnedObject;

    $(".desc").accordion();
    $("#tabs").tabs({ hide: { duration: 500, easing: "easeInOutBounce", effect: "explode", delay: 100 }, show: { duration: 500, easing: "easeOutBounce", effect: "explode", delay: 100 } });

    $('#1').trigger('click'); //it refuses to work


    $("li").on('click', function() {

        let id = ($(this).attr("id"));
        let qId = ($(this).attr('vidid'));
        $("#player").remove();
        $(`#tabs-${id}`).prepend(`<div id="player"></div>`);

        var player = new YT.Player('player', {
            height: '425',
            width: '755',
            videoId: $(this).attr('vidid'),
            events: {
                'onReady': onPlayerReady,
            }
        });

        function onPlayerReady(event) {
            event.target.playVideo();
        }

        $.ajax({

            //https://www.googleapis.com/youtube/v3/videos?id=9bZkp7q19f0&part=contentDetails&key={YOUR_API_KEY} (Returns different data, including duration).

            url: `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${qId}&key=AIzaSyB39ZHMkr0dC8-jVQOQyAeOhh7pjFbR9-A`,
            method: "GET"
        }).done((data) => {

            returnedObject = (data);
            console.log(returnedObject);
            console.log(qId);
            let description = (returnedObject.items[0].snippet.description);
            let idiom = (returnedObject.items[0].snippet.defaultAudioLanguage);
            let chTitle = (returnedObject.items[0].snippet.channelTitle);
            let pubDate = (returnedObject.items[0].snippet.publishedAt);
            //console.log(description);

            //CLEAR
            $(`#description-${id}`).html("");
            $(`#idiom-${id}`).html("");
            $(`#chtitle-${id}`).html("");
            $(`#date-${id}`).html("");
            //DISPLAY
            $(`#description-${id}`).html(description);
            $(`#idiom-${id}`).html(idiom);
            $(`#chtitle-${id}`).html(chTitle);
            $(`#date-${id}`).html(pubDate);

        });

    });

});