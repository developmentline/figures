describe('calculator', function() {
    it('should be an object', function() {
        expect(calculator).toEqual(jasmine.any(Object));
    });

    it('should compute a parallelogram\'s fourth vertex from previous three', function() {
        var expected = { x: 108, y: 42 };

        var firstVertex = { x: 54, y: 87 };
        var secondVertex = { x: -39, y: 23 };
        var thirdVertex = { x: 15, y: -22 };
        var fourthVertex = calculator.computeFourthVertex(
            firstVertex,
            secondVertex,
            thirdVertex
        );



        expect(fourthVertex).toEqual(expected);
    });

    it('should compute a parallelogram\'s center coordinate from', function() {
        var expected = { x: 14.5, y: -174.5 };

        var vertex = { x: -12, y: 43 };
        var oppositeVertex = { x: 41, y: -392 };

        var center = calculator.computeParallelogramCenter(vertex, oppositeVertex);
        expect(center).toEqual(expected);
    });

    it('should compute a parallelogram\'s area from its coordinates', function() {
        var expected = 7641;

        var firstVertex = { x: 54, y: 87 };
        var secondVertex = { x: -39, y: 23 };
        var thirdVertex = { x: 15, y: -22 };
        var fourthVertex = { x: 12, y: -39 }

        var area = calculator.computeParallelogramArea(firstVertex, secondVertex, thirdVertex, fourthVertex);
        expect(area).toEqual(expected);
    });

    it('should compute radius from the circle\'s area', function() {
        var expected = 13;

        var area = 600;

        var radius = parseInt(calculator.computeRadiusFromArea(area));
        expect(radius).toEqual(expected);
    });
});