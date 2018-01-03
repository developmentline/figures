describe('toolBox', function() {
    it('should be an object', function() {
        expect(toolBox).toEqual(jasmine.any(Object));
    });

    it('should contain the default circle\'s end angle setting', function() {
        var expected = 2 * Math.PI;
        expect(toolBox.CIRCLE_END_ANGLE).toEqual(expected);
    });

    it('should contain the default circle\'s start angle setting', function() {
        var expected = 0;
        expect(toolBox.CIRCLE_START_ANGLE).toEqual(expected);
    });

    it('should contain the default circle\'s radius setting', function() {
        var expected = 11 / 2;
        expect(toolBox.DEFAULT_CIRCLE_RADIUS).toEqual(expected);
    });

    it('should have a stroke with default value', function() {
        var expected = 1;
        expect(toolBox.currentStrokeWidth).toEqual(expected);
    });

    describe('when picking a color to draw', function() {
        it('should keep track of the selected color', function() {
            expect(toolBox.currentColor).toEqual(undefined);

            toolBox.pickColor('red');

            expect(toolBox.currentColor).toEqual('red');
        });

        it('should allow to chain calls', function() {
            expect(toolBox.pickColor()).toEqual(toolBox);
        });
    });

    describe('when choosing the brush size', function() {
        it('should keep track of the size selected', function() {
            toolBox.pickBrushOfWith(10);

            expect(toolBox.currentStrokeWidth).toEqual(10);
        });

        it('should allow to chain calls', function() {
            expect(toolBox.pickBrushOfWith()).toEqual(toolBox);
        });
    });

    describe('when constructing an arc', function() {
        beforeEach(function() {
            this.contextMock = utils.mocks.mockContext();
            this.radius = 10;
            this.x = 20;
            this.y = 40;

            toolBox.constructArc(this.contextMock, this.x, this.y, this.radius);
        });

        it('should set up the compass to start drawing', function() {
            expect(this.contextMock.beginPath).toHaveBeenCalled();
        });

        it('should rotate all the way over to draw the circle', function() {
            expect(this.contextMock.arc).toHaveBeenCalledWith(
                this.x,
                this.y,
                this.radius,
                toolBox.CIRCLE_START_ANGLE,
                toolBox.CIRCLE_END_ANGLE
            );
        });

        it('should pick up the compass right back', function() {
            expect(this.contextMock.closePath).toHaveBeenCalled();
        });

        describe('when constructing an arc using the default radius from the settings', function() {
            beforeEach(function() {
                toolBox.constructArc(this.contextMock, this.x, this.y);
            });

            it('should set up the compass to start drawing', function() {
                expect(this.contextMock.beginPath).toHaveBeenCalled();
            });

            it('should rotate all the way over to draw the circle', function() {
                expect(this.contextMock.arc).toHaveBeenCalledWith(
                    this.x,
                    this.y,
                    toolBox.DEFAULT_CIRCLE_RADIUS,
                    toolBox.CIRCLE_START_ANGLE,
                    toolBox.CIRCLE_END_ANGLE
                );
            });

            it('should pick up the compass right back', function() {
                expect(this.contextMock.closePath).toHaveBeenCalled();
            });
        });
    });

    describe('when drawing a circle', function() {
        beforeEach(function() {
            this.contextMock = utils.mocks.mockContext();
            this.constructArcSpy = spyOn(toolBox, 'constructArc');
            this.x = 123;
            this.y = 293;
            this.radius = 304;

            toolBox.drawCircle(this.contextMock, this.x, this.y, this.radius);
        });

        it('should pick up the right tools', function() {
            expect(this.contextMock.strokeStyle).toEqual(toolBox.currentColor);
            expect(this.contextMock.lineWidth).toEqual(toolBox.currentStrokeWidth);
        });

        it('should prepare the circle', function() {
            expect(this.constructArcSpy).toHaveBeenCalledWith(this.contextMock, this.x, this.y, this.radius);
        });

        it('should draw the circle', function() {
            expect(this.contextMock.stroke).toHaveBeenCalled();
        });
    });

    describe('when drawing a filled circle', function() {
        beforeEach(function() {
            this.contextMock = utils.mocks.mockContext();
            this.constructArcSpy = spyOn(toolBox, 'constructArc');
            this.x = 123;
            this.y = 293;

            toolBox.drawFilledCircle(this.contextMock, this.x, this.y);
        });

        it('should pick up the right tools', function() {
            expect(this.contextMock.fillStyle).toEqual(toolBox.currentColor);
        });

        it('should prepare the circle', function() {
            expect(this.constructArcSpy).toHaveBeenCalledWith(this.contextMock, this.x, this.y);
        });

        it('should draw the circle', function() {
            expect(this.contextMock.fill).toHaveBeenCalled();
        });
    });

    describe('when drawing a polygon', function() {
        var lines = [ { x: 121, y: 523 }, { x: 745, y: 85645 }, { x: -23, y: 123 }, { x: -5293, y: -121 } ];
        beforeEach(function() {
            this.contextMock = utils.mocks.mockContext();
            this.startingPoint = { x: 123, y: 393 };

            toolBox.drawPolygon(this.contextMock, this.startingPoint, lines);
        });

        it('should pick up the right tools', function() {
            expect(this.contextMock.strokeStyle).toEqual(toolBox.currentColor);
            expect(this.contextMock.lineWidth).toEqual(toolBox.currentStrokeWidth);
        });

        it('should set up the pencil to start drawing', function() {
            expect(this.contextMock.beginPath).toHaveBeenCalled();
        });

        it('should put the pencil on the starting point', function() {
            expect(this.contextMock.moveTo).toHaveBeenCalledWith(this.startingPoint.x, this.startingPoint.y);
        });

        lines.forEach(function(line) {
            describe('when drawing each line', function() {
                it('should draw the line with the right values: ' + line.toString(), function() {
                    expect(this.contextMock.lineTo).toHaveBeenCalledWith(line.x, line.y);
                });
            });
        });

        it('should draw the circle', function() {
            expect(this.contextMock.stroke).toHaveBeenCalled();
        });

        it('should pick up the pencil', function() {
            expect(this.contextMock.closePath).toHaveBeenCalled();
        });

    });
});