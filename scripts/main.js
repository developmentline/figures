(function(window, document, undefined) {
    'use strict';

    var drawingArea = document.getElementById('drawing-area');
    var resetButton = document.getElementById('reset-button');
    var aboutButton = document.getElementById('about-button');
    var pointsSection = document.getElementById('points-section');
    var areasSection = document.getElementById('areas-section');

    var controls = {
        resetButton: resetButton,
        aboutButton: aboutButton
    };

    var book = {
        pointsSection,
        areasSection
    };

    window.noteBook.init(book);
    window.painter.init(
        drawingArea,
        window.brush,
        window.coordinates,
        window.calculator,
        controls,
        window.noteBook);


})(window, document);
