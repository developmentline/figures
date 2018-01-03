(function(window, document, undefined) {
    'use strict';

    var drawingArea = document.getElementById('drawing-area');
    var resetButton = document.getElementById('reset-button');
    var aboutButton = document.getElementById('about-button');

    var controls = {
        resetButton: resetButton,
        aboutButton: aboutButton
    };

    noteBook.init('note-book');

    painter.init(
        drawingArea,
        toolBox,
        calculator,
        noteBook,
        controls,
        coordinates,
    );


})(window, document);
