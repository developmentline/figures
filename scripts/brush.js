(function(window, document, undefined) {
    'use strict';

    var Brush = {
        CIRCLE_END_ANGLE: 2 * Math.PI,
        DEFAULT_CIRCLE_RADIUS: 11 / 2,
        CIRCLE_START_ANGLE: 0,

        currentStrokeWidth: 1,

        pickColor: function(color) {
            this.currentColor = color;
            return this;
        },

        pickBrushOfWith: function(width) {
            this.currentStrokeWidth = width;
            return this;
        },

        constructArc: function(context, x, y, radius) {
            context.beginPath();
            context.arc(
                x,
                y,
                radius || this.DEFAULT_CIRCLE_RADIUS,
                this.CIRCLE_START_ANGLE,
                this.CIRCLE_END_ANGLE
            );
            context.closePath();
        },

        drawCircle: function(context, x, y, radius) {
            context.strokeStyle = this.currentColor;
            context.lineWidth = this.currentStrokeWidth;
            this.constructArc(context, x, y, radius);
            context.stroke();
        },

        drawFilledCircle: function(context, x, y) {
            context.fillStyle = this.currentColor;
            this.constructArc(context, x, y);
            context.fill();
        },

        drawPolygon: function(context, startingPoint, lines) {
            context.strokeStyle = this.currentColor;
            context.lineWidth = this.currentStrokeWidth;
            context.beginPath();
            context.moveTo(startingPoint.x,startingPoint.y);

            lines.forEach(function(line) {
                context.lineTo(line.x,line.y);
            });

            context.closePath();
            context.stroke();
        },
    };

    window.brush = Brush;

})(window, document);