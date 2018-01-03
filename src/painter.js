var painter = (function(window, document, undefined) {
    'use strict';

    var Painter = {
        init: function(drawingArea, toolBox, calculator, noteBook, controls, coordinates) {
            this.drawingArea = drawingArea;
            this.drawingAreaContext = this.drawingArea.getContext("2d");

            this.toolBox = toolBox;
            this.coordinates = coordinates;
            this.calculator = calculator;
            this.controls = controls;
            this.noteBook = noteBook;

            this.on('click', this.drawingArea, this.draw);
            this.on('mousedown', this.drawingArea, this.beginFigureAdjustment);
            this.on('mouseup', this.drawingArea, this.endFigureAdjustment);
            this.on('mousemove', this.drawingArea, this.redrawFigure);
            this.on('click', this.controls.resetButton, this.cleanAll);
        },

        on: function(eventName, element, callback) {
            element.addEventListener(eventName, callback.bind(this));
        },

        draw: function(eventObject) {
            if (!this.allPointsSelected()) {
                var x = eventObject.layerX;
                var y = eventObject.layerY;
                this.takeNotePoint(x, y)
                    .saveCoordinates(x, y)
                    .drawPoint(x, y)
                    .drawFigures();
            }
        },

        beginFigureAdjustment: function(eventObject) {
            if (this.allPointsSelected()) {
                this.isDragging = true;
            }
        },

        endFigureAdjustment: function() {
            this.isDragging = false;
        },

        redrawFigure: function(eventObject) {
            if(this.isDragging) {
                var x = eventObject.layerX;
                var y = eventObject.layerY;
                this.adjustPoint(x, y)
            }
        },

        saveCoordinates: function(x, y) {
            var coordinate = {
                x: x,
                y: y
            };

            this.coordinates.add(coordinate);
            return this;
        },

        drawFigures() {
            if (this.allPointsSelected()) {
                this.drawParallelogram()
                    .drawCircle()
            }
        },

        adjustPoint: function(x, y) {
            var newCoordinate = {
                x: x,
                y: y
            };
            var draggedCoordinate = this.coordinates.getDraggingCoordinate(
                newCoordinate,
                this.toolBox.DEFAULT_CIRCLE_RADIUS
            );

            if (draggedCoordinate !== null) {
                draggedCoordinate.x = newCoordinate.x;
                draggedCoordinate.y = newCoordinate.y;
                this.onPointUpdate();
            }

            return this;
        },

        onPointUpdate: function() {
            var coordinates = this.coordinates.all();

            this.clearDrawingArea();
            this.noteBook.clear();

            for (var index in coordinates) {
                var x = coordinates[index].x;
                var y =  coordinates[index].y;
                this.takeNotePoint(x, y)
                    .drawPoint(x, y);
            }

            this.drawFigures();
        },

        drawPoint: function(x, y) {
            this.toolBox
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

            this.toolBox
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

            var area = this.calculator.computeParallelogramArea(
                firstVertex,
                secondVertex,
                thirdVertex,
                fourthVertex
            );

            this.takeNoteArea(area);

            var radius = this.calculator.computeRadiusFromArea(area);

            this.toolBox
                .pickBrushOfWith(2)
                .pickColor('yellow')
                .drawCircle(this.drawingAreaContext, center.x, center.y, radius);

            return this;
        },

        takeNotePoint: function(x, y) {
            var line = '<p>Point :' + '(' + x + ', ' + y + ')</p>';
            this.noteBook.write(line);

            return this;
        },

        takeNoteArea: function(area) {
            var parallelogramsLine = '<p>Parallelogram\'s area: ' + area;
            var circlesLine = '<p>Circle\'s area: ' + area;
            this.noteBook.write(parallelogramsLine);
            this.noteBook.write(circlesLine);
        },

        cleanAll: function() {
            if (this.coordinates.count() > 0) {
                this.clearDrawingArea()
                this.coordinates.clear();
                this.noteBook.clear();
            }
        },

        clearDrawingArea: function() {
            this.drawingAreaContext.clearRect(0, 0, this.drawingArea.width, this.drawingArea.height);
            return this;
        },

        allPointsSelected: function() {
            return this.coordinates.count() === 3;
        },
    };

    return Object.create(Painter);

})(window, document);