var lines; //[] (break the text area into array elements using a carriae return splitter)
const OG = ["1"]; //[] (create 1 gutter element for every line array element. Number them in series)
var currentGutter;
var currentLine; //int (representing the index # of the line in the lines and gutter arrays)

function getLinesArray() {
    var rawInput = $("#editor-textarea").val();
    //Break lines up into a string array using carriage returns as the splitter
    var workingLines = rawInput.split(/\r?\n/);
    //Re-Add the carriage return to the end of each line except the last
    for(let i = 0; i < workingLines.length - 2; i++) {
        workingLines[i] = workingLines[i]+ "\r";
    }
    lines = workingLines;
    //For now, this is really just being used for the count... may be needed in copy paste stuff in the future, so don't delete
}

function setGutterArray() {
    //There will always be the number 1 in the gutter. Don't delete this
    //Remove all elements in the gutter container in HTML file except "1"
    //Using the count of lines, recursicvely add numbers to to the gutter container in the html, adding the proper class
    let workingGutter = OG;
    for(let i = 1; i < lines.length; i++) {
        workingGutter[i] = String(i+1);
    }
    currentGutter = workingGutter;
}

function displayGutter() {
    //Remove all child elements of #gutter excet "g1"
    $("#gutter").empty();
    //Set new child elements
    if(currentGutter.length > 1) {
        let p1 = '<div id="';
        let idTag;
        let p2 = '" class="gutter-number">';
        let content;
        let p3 = "</div>"
        for(let i = 0; i < currentGutter.length; i++) {
            content = String(i+1);
            idTag = "g" + content;
            let appendString = p1 + idTag + p2 + content + p3;
            $("#gutter").append(appendString);
        }
    }
}

/*function setCurrentLine(l) {
    currentLine = l;
    highlightLine(l);
}

function highlightLine(l) {
    //don't forget to unhighlight every other line
    //l is the passed in idex of the proper line/gutter array element
    //RESEARCH FOR THIS :(
}*/

function editorHandling(l) {
    autoGrowTextArea();
    getLinesArray();
    setGutterArray();
    displayGutter();
    //setCurrentLine(l);
    //alert(lines.length + " " + lines[(lines.length-1) + "\r" + currentGutter.length + " " + currentGutter[(currentGutter.length-1)]]);
}

function autoGrowTextArea() {
    $("#editor-textarea").height("5px");
    let needed = $('textarea:first').prop('scrollHeight');
    $("#editor-textarea").css("height", needed);
}

function sizeStuff() {
    let lineHeight = $(".gutter-number").height();
    let leftOffset = $("").offset();
    $("#highlighter").css("height", lineHeight);
}

function preparePage() {
    //Getting Footer Menu Ready
    $("#settings-box").hide();
    //Set placeholder text
    //FOR TESTING
    $("#editor-textarea").val("bobby-booy\rbilly booooooy");
    editorHandling();
}

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