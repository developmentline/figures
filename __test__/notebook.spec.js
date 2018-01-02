describe('notebook', function() {
    beforeEach(function() {
        var notes = utils.pageObjects.notes;
        utils.insertFixture(notes);
    });

    it('should be an object', function() {
        expect(noteBook).toEqual(jasmine.any(Object));
    });

    describe('when initialized with a note-book selector', function() {
        beforeEach(function() {
            noteBook.init('note-book');
        });

        it('should keep track of that book', function() {
            expect(noteBook.book).toEqual(document.getElementById('note-book'));
        });

        it('should allow to write to the note book', function() {
            noteBook.write('first text. ');
            expect(noteBook.book.innerHTML).toEqual('first text. ');
            noteBook.write('second text.');
            expect(noteBook.book.innerHTML).toEqual('first text. second text.');
        });

        it('should allow to clear the book', function() {
            noteBook.write('first text. ');
            noteBook.clear();
            expect(noteBook.book.innerHTML).toEqual('');
        });
    });
});