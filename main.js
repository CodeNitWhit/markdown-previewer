$(document).ready(function() {
    $("#settings-box").hide();
    $('#settings-button').click(function() {
        $("#settings-box").show();
        $("#container").css("opacity", "0.5");
        $('#settings-button').css("box-shadow", "2px 2px 50px 10px grey inset");
    });
    $("#exit-btn").click(function() {
        $("#settings-box").hide();
        $("#container").css("opacity", "1");
        $('#settings-button').css("box-shadow", "none");
    });
});