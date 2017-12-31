(function(window, document, undefined) {
    'use strict';

    var NoteBook = {
        init: function(book) {
            this.book = book;
        },

        printPoint: function(point, pointIndex) {
            var currentContent = this.book.pointsSection.innerHTML;
            var newAnnotation = '<li>Point ' + pointIndex + ' (' + point.x + ', ' + point.y + ')</li>';
            this.book.pointsSection.innerHTML = currentContent + newAnnotation;

            return this;
        },

        clearWrittenPoints: function() {
            this.book.pointsSection.innerHTML = '';
        },

        clearWrittenAreas: function() {
            this.book.areasSection.innerHTML = '';
        },

        writePoints: function(points) {
            var self = this;

            self.clearWrittenPoints();
            points.forEach(function(point, index) {
                self.printPoint(point, index + 1);
            });

            return this;
        },

        writeAreas: function(area) {
            area = area || '';
            var newParallelogramAnnotation = '<li>Parallelogram\'s area: ' + area + '</li>';
            var newCircleAnnotation = '<li>Circle\'s area: ' + area + '</li>';

            this.clearWrittenAreas();

            this.book.areasSection.innerHTML = newParallelogramAnnotation + newCircleAnnotation;
        },

        clear: function() {
            this.clearWrittenPoints();
            this.clearWrittenAreas();
        },

    };

    window.noteBook = NoteBook;

})(window, document);