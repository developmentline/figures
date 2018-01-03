var utils = (function(window, document, undefined) {
    'use strict';

    var drawingArea = '<div id="fixture"><canvas id="drawing-area" width="600" height="600"></canvas></div>';

    var notes = '<div class="notes" id="note-book"></div>';

    var controls = '<div class="controls"><button class="btn" id="about-button"><span>About</span></button><button class="btn" id="reset-button"><span>Reset</span></button></div>';

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
        var eventInstance = new MouseEvent('click', {
            clientX: x,
            clientY: y,
            bubbles: false,
            cancelable: false,
        });

        element.dispatchEvent(eventInstance);

        var coordinates = {
            x: eventInstance.layerX,
            y: eventInstance.layerY,
        };

        return coordinates;
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
            controls: controls,
        },
        mocks: {
            mockContext: mockContext,
        },
        insertFixture: insertFixture,
        simulateClickAtPosition: simulateClickAtPosition,
        simulateCoordinates: simulateCoordinates,
    };

})(window, document);