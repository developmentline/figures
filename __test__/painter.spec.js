describe('given the painter module', function() {
    it('should define a painter', function() {
        expect(painter).toEqual(jasmine.any(Object));
    });

    describe('when initialized', function() {
        beforeEach(function() {
            var drawingAreaFixture = utils.pageObjects.drawingArea;
            utils.insertFixture(drawingAreaFixture);

            var controlsFixture = utils.pageObjects.controls;
            utils.insertFixture(controlsFixture);

            var notebookFixture = utils.pageObjects.notes;
            utils.insertFixture(notebookFixture);

            this.drawingArea = document.getElementById('drawing-area');
            this.resetButton = document.getElementById('reset-button');
            this.aboutButton = document.getElementById('about-button');

            this.controls = {
                resetButton: this.resetButton,
                aboutButton: this.aboutButton
            };

            noteBook.init('note-book');

            painter.init(this.drawingArea, toolBox, calculator, noteBook, this.controls, coordinates);
        });

        it('should keep track of the drawing area', function() {
            // this.coordinate = utils.simulateClickAtPosition(59,87,this.drawingArea);
            expect(painter.drawingArea).toEqual(this.drawingArea);
        });

        it('should keep track of the drawing context', function() {
            expect(painter.drawingAreaContext).toEqual(this.drawingArea.getContext('2d'));
        });

        it('should keep track of the tool box', function() {
            expect(painter.toolBox).toEqual(toolBox);
        });

        it('should keep track of the coordinates', function() {
            expect(painter.coordinates).toEqual(coordinates);
        });

        it('should keep track of the calculator', function() {
            expect(painter.calculator).toEqual(calculator);
        });

        it('should keep track of the controls', function() {
            expect(painter.controls).toEqual(this.controls);
        });

        it('should keep track of the noteBook', function() {
            expect(painter.noteBook).toEqual(noteBook);
        });

        it('should keep track of the noteBook', function() {
            expect(painter.noteBook).toEqual(noteBook);
        });

        describe('when clicking in the drawing area', function() {
            describe('and not points have been selected',function() {
                beforeEach(function() {
                    painter.coordinates.clear();

                    this.drawFilledCircleSpy = spyOn(toolBox, 'drawFilledCircle').and.callThrough();
                    this.drawPolygonSpy = spyOn(toolBox, 'drawPolygon').and.callThrough();
                    this.drawCircleSpy = spyOn(toolBox, 'drawCircle').and.callThrough();

                    this.point = utils.simulateClickAtPosition(100, 200, this.drawingArea);
                });

                it('should keep track of the selected point', function() {
                    expect(painter.coordinates.peek()).toEqual(this.point);
                });

                it('should take note of the selected point', function() {
                    var annotation = new RegExp('<p>Point:\\s\\('+ this.point.x +',\\s'+ this.point.y +'\\)<\\/p>');

                    var match = annotation.test(painter.noteBook.book.innerHTML);
                    expect(match).toEqual(true);
                });

                it('should draw the point', function() {
                    expect(this.drawFilledCircleSpy).toHaveBeenCalledWith(
                        painter.drawingAreaContext,
                        this.point.x,
                        this.point.y
                    );
                });

                it('should not draw the figures', function() {
                    expect(this.drawPolygonSpy).not.toHaveBeenCalled();
                    expect(this.drawCircleSpy).not.toHaveBeenCalled();
                });
            });

            describe('and all three points have been selected',function() {
                beforeEach(function() {
                    painter.coordinates.clear();

                    this.drawPolygonSpy = spyOn(toolBox, 'drawPolygon').and.callThrough();
                    this.drawCircleSpy = spyOn(toolBox, 'drawCircle').and.callThrough();

                    utils.simulateCoordinates(3, this.drawingArea);
                });

                it('should draw the figures', function() {
                    expect(this.drawPolygonSpy).toHaveBeenCalled();
                    expect(this.drawCircleSpy).toHaveBeenCalled();
                });

                describe('and another point is selected', function() {
                    beforeEach(function() {
                        this.drawFilledCircleSpy = spyOn(toolBox, 'drawFilledCircle');
                        this.point = utils.simulateClickAtPosition(100, 200, this.drawingArea);
                    });

                    it('should ignore it', function() {
                        expect(this.drawFilledCircleSpy).not.toHaveBeenCalled();
                    });
                });

                describe('and a point is dragged', function() {
                    beforeEach(function() {
                        painter.coordinates.clear();

                        this.drawFilledCircleSpy = spyOn(toolBox, 'drawFilledCircle');

                        painter.coordinates.add({ x: 123, y: 523 });
                        painter.coordinates.add({ x: 534, y: 63 });
                        painter.coordinates.add({ x: 64, y: 293 });

                        painter.beginFigureAdjustment();

                        painter.redrawFigure({ layerX: 63, layerY: 292 });

                        painter.endFigureAdjustment();
                    });

                    it('should redraw the points', function() {
                        expect(this.drawFilledCircleSpy.calls.count()).toEqual(3);
                        expect(this.drawFilledCircleSpy).toHaveBeenCalledWith(painter.drawingAreaContext, 63, 292);
                    });

                    it('should redraw the figures', function() {
                        expect(this.drawPolygonSpy).toHaveBeenCalled();
                        expect(this.drawCircleSpy).toHaveBeenCalled();
                    });
                });
            });
        });

        describe('when restarting', function() {
            beforeEach(function() {
                this.clearAreaSpy = spyOn(painter.drawingAreaContext, 'clearRect');
                this.clearCoordinatesSpy = spyOn(painter.coordinates, 'clear');
                this.clearNotebooksSpy = spyOn(painter.noteBook, 'clear');

                painter.coordinates.add({ x: 123, y: 523 });
                painter.coordinates.add({ x: 534, y: 63 });
                painter.coordinates.add({ x: 64, y: 293 });

                painter.controls.resetButton.click();
            });

            it('then should clear the drawing area', function() {
                expect(this.clearAreaSpy).toHaveBeenCalled();
            });

            it('then should clear the coordinates', function() {
                expect(this.clearCoordinatesSpy).toHaveBeenCalled();
            });

            it('then should clear the notebook', function() {
                expect(this.clearNotebooksSpy).toHaveBeenCalled();
            });
        });
    });
});
