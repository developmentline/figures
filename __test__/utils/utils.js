var utils = (function(window, document, undefined) {
    'use strict';

    var drawingArea = '<div id="fixture"><canvas id="drawing-area" width="600" height="600"></canvas></div>';

    var notes = '<div class="notes" id="note-book"></div>';

    function insertFixture(fixture) {
        document.body.insertAdjacentHTML(
            'afterbegin',
            fixture
        );
    }


    return {
        pageObjects: {
            drawingArea: drawingArea,
            notes: notes,
        },
        insertFixture: insertFixture
    };

})(window, document);