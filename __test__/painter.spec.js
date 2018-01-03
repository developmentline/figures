describe('given the painter module', function() {
    it('should define a painter', function() {
        expect(painter).toEqual(jasmine.any(Object));
    });

    describe('when drawing', function() {
        beforeEach(function() {
            var drawingArea = utils.pageObjects.drawingArea;
            utils.insertFixture(drawingArea);
        });
    });
});
