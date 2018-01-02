var noteBook = (function(window, document, undefined) {
    'use strict';

    var NoteBook = {
        init: function(bookSelector) {
            this.book = document.getElementById(bookSelector);
        },

        clear: function() {
            this.book.innerHTML = '';
        },

        write: function(text) {
            this.book.innerHTML = this.book.innerHTML + text;
        }
    };

    return Object.create(NoteBook);

})(window, document);