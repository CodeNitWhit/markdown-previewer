$(document).ready(function() {
    preparePage();
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
    $("#editor-textarea").on('input', (event) => editorHandling());
});




var placeholderText = "bobby-booy\rbilly booooooy";
var currentGutter;
var currentLine; //int (representing the index # of the line in the lines and gutter arrays)
var lastLine = 0;


function preparePage() {
    //Getting Footer Menu Ready
    $("#settings-box").hide();
    //Set placeholder text
    $("#editor-textarea").val(placeholderText);
    editorHandling();
}

function editorHandling() {
    autoGrowTextArea();
    setGutterArray();
    displayGutter();
    //highlighterHandling();
}

/*function highlighterHandling() {
    fetchHighlightHeight();
    moveHighlighter();
}*/

function autoGrowTextArea() {
    $("#editor-textarea").height("5px");
    let needed = $('textarea:first').prop('scrollHeight');
    $("#editor-textarea").css("height", needed);
}

function setGutterArray() {
    //There will always be the number 1 in the gutter.
    //Remove all elements in the gutter container in HTML file
    //Using the count of lines (gotten from text area scrollHeight / gutter-number height), recursicvely add numbers to to the gutter container in the html, adding the proper class
    currentGutter = [];
    let lineHeight = $(".gutter-number").height();
    let textHeight = $('textarea:first').prop('scrollHeight');
    let numNumbers = Math.floor(textHeight/lineHeight);
    for(let i = 1; i <= numNumbers; i++) {
        currentGutter.push(i);
    }
}

function displayGutter() {
    //Remove all child elements of #gutter excet "g1"
    $("#gutter").empty();
    //Set new child elements
    let p1 = '<div id="';
    let idTag;
    let p2 = '" class="gutter-number">';
    let content;
    let p3 = "</div>";
    if(currentGutter.length > 1) {
        for(let i = 0; i < currentGutter.length; i++) {
            content = i+1;
            idTag = "g" + content;
            let appendString = p1 + idTag + p2 + content + p3;
            $("#gutter").append(appendString);
        }
    } else {
        content = "1";
        idTag = "g1";
        let appendString = p1 + idTag + p2 + content + p3;
        $("#gutter").append(appendString);
    }
}

/*function fetchHighlightHeight() {
    var linesData = $("#editor-textarea").val();
    let lines = linesData.split(/\r?\n/);
    let cursorIndex = Math.floor($("#editor-textarea")[0].selectionStart);
    var lineI = 0; //Represents which line is to be highlighted
    let lineFound = false;
    while(cursorIndex > 0 && !lineFound) {
        if(cursorIndex > lines[lineI].length) {
            cursorIndex -= lines[lineI].length;
            lineI += 1;
        } else {
            lineFound = true;
        }
    }
    lastLine = currentLine;
    currentLine = lineI + 1;
    alert(currentLine);
}*/

/*function moveHighlighter() {

}*/