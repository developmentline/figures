describe('coordinates', function() {
    it('should be an object', function() {
        expect(coordinates).toEqual(jasmine.any(Object));
    });

    it('should allow to add coordinates', function() {
        expect(coordinates.coordinatesList.length).toEqual(0);

        coordinates.add({ x: 12, y: 123 });

        expect(coordinates.coordinatesList.length).toEqual(1);
        expect(coordinates.coordinatesList).toContain({ x: 12, y: 123 });

        coordinates.add({ x: 43, y: 345 });

        expect(coordinates.coordinatesList.length).toEqual(2);
        expect(coordinates.coordinatesList).toContain({ x: 12, y: 123 });
    });

    it('should allow to get all coordinates', function() {
        coordinates.coordinatesList = [];

        coordinates.add({ x: 12, y: 123 });
        coordinates.add({ x: 43, y: 345 });

        var allCoordinates = coordinates.all();

        expect(allCoordinates.length).toEqual(2);

        expect(allCoordinates).toContain({ x: 12, y: 123 });
        expect(allCoordinates).toContain({ x: 43, y: 345 });
    });

    it('should count all present coordinates', function() {
        coordinates.coordinatesList = [];

        coordinates.add({ x: 12, y: 123 });
        coordinates.add({ x: 43, y: 345 });

        var coordinatesCount = coordinates.count();

        expect(coordinatesCount).toEqual(2);
    });

    it('should clear all present coordinates', function() {
        coordinates.coordinatesList = [];

        coordinates.add({ x: 12, y: 123 });
        coordinates.add({ x: 43, y: 345 });

        coordinates.clear();

        expect(coordinates.coordinatesList.length).toEqual(0);
    });

    describe('when peeking a coordinate', function() {
        describe('and no index is specified', function() {
            it('should return the last coordinate', function() {
                coordinates.coordinatesList = [];

                coordinates.add({ x: 12, y: 123 });
                coordinates.add({ x: 43, y: 345 });

                var coordinate = coordinates.peek();
                expect(coordinate).toEqual({ x: 43, y: 345 });
            });
        });

        describe('and an index is specified', function() {
            it('should return the coordinate at that position', function() {
                coordinates.coordinatesList = [];

                coordinates.add({ x: 12, y: 123 });
                coordinates.add({ x: 43, y: 345 });
                coordinates.add({ x: 2313, y: -1123 });
                coordinates.add({ x: 5490, y: 54123 });

                var coordinate = coordinates.peek(2);
                expect(coordinate).toEqual({ x: 2313, y: -1123 });
            });
        });
    });

    describe('when getting a coordinate that is being dragged', function() {
        beforeEach(function() {
            coordinates.coordinatesList = [];

            coordinates.add({ x: 12, y: 123 });
            coordinates.add({ x: 43, y: 345 });
            coordinates.add({ x: 2313, y: -1123 });
            coordinates.add({ x: 5490, y: 54123 });
        });

        describe('and the dragging coordinate is not found', function() {
            it('should indicate that it was not found', function() {
                var draggingCoordinate = { x: 0, y: 0 };

                var foundCoordinate = coordinates.getDraggingCoordinate(draggingCoordinate, 11);
                expect(foundCoordinate).toEqual(null);
            });
        });

        describe('and the dragging coordinate is found', function() {
            it('should give back the found coordinate', function() {
                var draggingCoordinate = { x: 44, y: 343 };

                var foundCoordinate = coordinates.getDraggingCoordinate(draggingCoordinate, 11);
                expect(foundCoordinate).toEqual({ x: 43, y: 345 });
            });
        });
    });
});