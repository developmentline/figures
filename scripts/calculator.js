var calculator = (function(window, document, undefined) {
    'use strict';

    var Calculator = {
        computeFourthVertex: function(firstVertex, secondVertex, thirdVertex) {
            return {
                x: (thirdVertex.x - secondVertex.x) + firstVertex.x,
                y: (thirdVertex.y - secondVertex.y) + firstVertex.y
            };
        },

        computeParallelogramCenter: function(vertex, oppositeVertex) {
            return {
                x: (vertex.x + oppositeVertex.x) / 2,
                y: (vertex.y + oppositeVertex.y) / 2,
            }
        },

        computeParallelogramArea: function(firstVertex, secondVertex, thirdVertex, fourthVertex) {
            var AB = {
                x: secondVertex.x - firstVertex.x,
                y: secondVertex.y - firstVertex.y
            }

            var AC = {
                x: thirdVertex.x - firstVertex.x,
                y: thirdVertex.y - firstVertex.y
            }

            var area = Math.abs((AB.x * AC.y) - (AB.y * AC.x));

            return area;
        },

        computeRadiusFromArea: function(area) {
            return Math.sqrt(area / Math.PI);
        },
    };

    return Object.create(Calculator);

})(window, document);