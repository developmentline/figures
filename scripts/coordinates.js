var coordinates = (function(window, document, undefined) {
    'use strict';

    var Coordinates = {
        coordinatesList: [],

        add: function(coordinate) {
            this.coordinatesList.push(coordinate);
        },

        all: function() {
            return this.coordinatesList;
        },

        count: function() {
            return this.coordinatesList.length;
        },

        clear: function() {
            this.coordinatesList = [];
        },

        peek: function(position) {
            var index = position !== undefined ? position : this.coordinatesList.length - 1;
            return this.coordinatesList[index];
        },

        getDraggingCoordinate: function(newCoordinate, radius) {
            var self = this;
            var coordinateBeingDragged = this.coordinatesList.filter(function(coordinate) {
                return self.isDraggingCoordinate(coordinate, newCoordinate, radius);
            });

            return coordinateBeingDragged.length ? coordinateBeingDragged[0] : null;
        },

        isDraggingCoordinate: function(coordinate, newCoordinate, radius) {
            var dx = newCoordinate.x - coordinate.x;
            var dy = newCoordinate.y - coordinate.y;
            var isColliding = Math.pow(dx, 2) + Math.pow(dy, 2) <= Math.pow(radius, 2);
            return isColliding;
        },
    };

    return Object.create(Coordinates);

})(window, document);