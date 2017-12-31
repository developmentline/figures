(function(window, document, undefined) {
    'use strict';

    var Painter = {
        init: function(drawingArea, brush, coordinates, calculator, controls, noteBook) {
            this.drawingArea = drawingArea;
            this.drawingAreaContext = this.drawingArea.getContext("2d");

            this.brush = brush;
            this.coordinates = coordinates;
            this.calculator = calculator;
            this.controls = controls;
            this.noteBook = noteBook;

            this.bindEvent('click', this.drawingArea, this.draw);
            this.bindEvent('mousedown', this.drawingArea, this.beginImageAdjustment);
            this.bindEvent('mouseup', this.drawingArea, this.endImageAdjustment);
            this.bindEvent('mousemove', this.drawingArea, this.redrawImage);
            this.bindEvent('click', this.controls.resetButton, this.cleanAll);
        },

        bindEvent: function(eventName, element, callback) {
            var self = this;
            element.addEventListener(eventName, function(e) {
                callback.call(self, e);
            });
        },

        draw: function(eventObject) {
            if (!this.allPointsSelected()) {
                var x = eventObject.layerX;
                var y = eventObject.layerY;
                this.addPoint(x, y)
                    .takeNote()
                    .drawPoint(x, y)
                    .onPointAdded();
            }
        },

        beginImageAdjustment: function(eventObject) {
            if (this.allPointsSelected()) {
                this.dragging = true;
            }
        },

        endImageAdjustment: function() {
            this.dragging = false;
            this.onPointAdded();
        },

        onPointAdded() {
            if (this.allPointsSelected()) {
                this.drawParallelogram()
                    .drawCircle()
                    .takeNote();
            }
        },

        onPointUpdate: function() {
            this.clearDrawingArea();

            var self = this;
            this.coordinates.coordinatesList.forEach(function(coordinate) {
                self.drawPoint(coordinate.x, coordinate.y);
            });
        },

        redrawImage: function(eventObject) {
            if(this.dragging) {
                var x = eventObject.layerX;
                var y = eventObject.layerY;
                this.adjustPoint(x, y);
            }
        },

        addPoint: function(x, y) {
            var coordinate = {
                x: x,
                y: y
            };

            this.coordinates.add(coordinate);
            return this;
        },

        adjustPoint: function(x, y) {
            var newCoordinate = {
                x: x,
                y: y
            };
            var draggedCoordinate = this.coordinates.getDraggingCoordinate(
                newCoordinate,
                this.brush.DEFAULT_CIRCLE_RADIUS
            );

            if (draggedCoordinate !== null) {
                draggedCoordinate.x = newCoordinate.x;
                draggedCoordinate.y = newCoordinate.y;
                this.onPointUpdate();
            }

            return this;
        },

        drawPoint: function(x, y) {
            this.brush
                .pickColor('red')
                .drawFilledCircle(this.drawingAreaContext, x, y);
            return this;
        },

        drawParallelogram: function() {
            var firstVertex = this.coordinates.peek(0);
            var secondVertex = this.coordinates.peek(1);
            var thirdVertex = this.coordinates.peek(2);
            var fourthVertex = this.calculator.computeFourthVertex(
                firstVertex,
                secondVertex,
                thirdVertex
            );

            this.brush
                .pickBrushOfWith(2)
                .pickColor('blue')
                .drawPolygon(
                    this.drawingAreaContext,
                    firstVertex,
                    [secondVertex, thirdVertex, fourthVertex, firstVertex],
                );

            return this;
        },

        drawCircle: function() {
            var firstVertex = this.coordinates.peek(0);
            var secondVertex = this.coordinates.peek(1);
            var thirdVertex = this.coordinates.peek(2);
            var fourthVertex = this.calculator.computeFourthVertex(
                firstVertex,
                secondVertex,
                thirdVertex
            );

            var center = this.calculator.computeParallelogramCenter(firstVertex, thirdVertex);

            this.area = this.calculator.computeParallelogramArea(
                firstVertex,
                secondVertex,
                thirdVertex,
                fourthVertex
            );

            var radius = this.calculator.computeRadiusFromArea(this.area);

            this.brush
                .pickBrushOfWith(2)
                .pickColor('yellow')
                .drawCircle(this.drawingAreaContext, center.x, center.y, radius);

            return this;
        },

        takeNote: function() {
            this.noteBook
                .writePoints(this.coordinates.all())
                .writeAreas(this.area);
            return this;
        },

        cleanAll: function() {
            if (this.coordinates.count() > 0) {
                this.clearDrawingArea()
                this.coordinates.clear();
                this.noteBook.clear();
                this.area = null;
            }
        },

        clearDrawingArea: function() {
            this.drawingAreaContext.clearRect(0, 0, this.drawingArea.width, this.drawingArea.height);
        },

        allPointsSelected: function() {
            return this.coordinates.count() === 3;
        },
    };

    window.painter = Object.create(Painter);

})(window, document);