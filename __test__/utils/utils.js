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

    function simulateCoordinates(times, element) {
        for(var i = 0; i < times; i++) {
            simulateClickAtPosition(times - i, times + i, element);
        }
    };

    function simulateClickAtPosition(x, y, element) {
        eventInstance = new MouseEvent('click', {
            clientX: x,
            clientY: y,
            bubbles: false,
            cancelable: false,
        });

        element.dispatchEvent(eventInstance);
    };

    function mockContext() {
        return {
            beginPath: jasmine.createSpy('beginPath'),
            closePath: jasmine.createSpy('closePath'),
            arc: jasmine.createSpy('arc'),
            stroke: jasmine.createSpy('stroke'),
            fill: jasmine.createSpy('fill'),
            lineTo: jasmine.createSpy('lineTo'),
            moveTo: jasmine.createSpy('moveTo'),
            strokeStyle: null,
            lineWidth: null,
            fillStyle: null,
        }
    };

    return {
        pageObjects: {
            drawingArea: drawingArea,
            notes: notes,
        },
        mocks: {
            mockContext: mockContext,
        },
        insertFixture: insertFixture,
    };

})(window, document);