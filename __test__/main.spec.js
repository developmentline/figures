// function simulateCoordinates(times, element) {
//     for(var i = 0; i < times; i++) {
//         simulateClickAtPosition(times - i, times + i, element);
//     }
// };

// function simulateClickAtPosition(x, y, element) {
//     eventInstance = new MouseEvent('click', {
//         clientX: x,
//         clientY: y,
//         bubbles: false,
//         cancelable: false,
//     });

//     element.dispatchEvent(eventInstance);
// };

// describe('given the painter module', function() {
//     it('should define a painter', function() {
//         expect(painter).toEqual(jasmine.any(Object));
//     });

//     describe('when drawing', function() {
//         beforeEach(function() {
//             var drawingArea = '<div id="fixture"><canvas id="drawing-area" width="600" height="600"></canvas></div>';
//             document.body.insertAdjacentHTML(
//                 'afterbegin',
//                 drawingArea
//             );
            
//             painter.init();
//         });

//         it('should require up to three coordinates', function() {
//             simulateClickAtPosition(0, 0, painter.drawingArea);
//             expect(painter.coordinates.length).toEqual(1);

//             simulateClickAtPosition(0, 0, painter.drawingArea);
//             expect(painter.coordinates.length).toEqual(2);

//             simulateClickAtPosition(0, 0, painter.drawingArea);
//             expect(painter.coordinates.length).toEqual(3);
            
//             simulateClickAtPosition(0, 0, painter.drawingArea);
//             expect(painter.coordinates.length).toEqual(3);

//             simulateClickAtPosition(0, 0, painter.drawingArea);
//             expect(painter.coordinates.length).toEqual(3);
//         });

//         it('should draw each coordinate to the drawing area', function() {
//             var arcSpy = spyOn(painter.drawingAreaContext, 'arc');
//             simulateCoordinates(3, painter.drawingArea);            

//             expect(arcSpy.calls.count()).toEqual(3);
//         });
//     });
// });
