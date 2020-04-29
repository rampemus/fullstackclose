import BookInstance from '../models/bookinstance.js'
import Book from '../models/book.js'
import async from 'async'

// const { body,validationResult } = require('express-validator/check')
// const { sanitizeBody } = require('express-validator/filter')

// Display list of all BookInstances.
export const bookInstanceList = function(req, res, next) {

  BookInstance.find()
    .populate('book')
    .exec(function (err, listBookInstances) {
      if (err) { return next(err) }
      res.status(200).json({ title: 'Book Instance List', bookInstanceList:  listBookInstances})
    })

}

// Display detail page for a specific BookInstance.
export const bookinstanceDetail = function(req, res, next) {

    BookInstance.findById(req.params.id)
    .populate('book')
    .exec(function (err, bookinstance) {
      if (err) { return next(err) }
      if (bookinstance==null) { // No results.
          var err = new Error('Book copy not found')
          err.status = 404
          return next(err)
        }
      res.status(200).json({ title: 'Book:', bookinstance:  bookinstance})
    })

}

// Display BookInstance create form on GET.
export const bookinstanceCreateGet = function(req, res, next) {

     Book.find({},'title')
    .exec(function (err, books) {
      if (err) { return next(err) }
      res.status(200).json({title: 'Create BookInstance', bookList:books } )
    })

}

// Handle BookInstance create on POST.
export const bookinstanceCreatePost = [

    // Validate fields.
    // body('book', 'Book must be specified').isLength({ min: 1 }).trim(),
    // body('imprint', 'Imprint must be specified').isLength({ min: 1 }).trim(),
    // body('dueBack', 'Invalid date').optional({ checkFalsy: true }).isISO8601(),
    
    // Sanitize fields.
    // sanitizeBody('book').escape(),
    // sanitizeBody('imprint').escape(),
    // sanitizeBody('status').escape(),
    // sanitizeBody('dueBack').toDate(),
    
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req)

        // Create a BookInstance object with escaped and trimmed data.
        var bookinstance = new BookInstance(
          { book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            dueBack: req.body.dueBack
           })

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values and error messages.
            Book.find({},'title')
                .exec(function (err, books) {
                    if (err) { return next(err) }
                    res.status(404).json({ title: 'Create BookInstance', bookList : books, selectedBook : bookinstance.book._id , errors: errors.array(), bookinstance:bookinstance })
            })
            return
        }
        else {
            // Data from form is valid
            bookinstance.save(function (err) {
                if (err) { return next(err) }
                   // Successful - redirect to new record.
                   res.redirect(bookinstance.url)
                })
        }
    }
]



// Display BookInstance delete form on GET.
export const bookinstanceDeleteGet = function(req, res, next) {

    BookInstance.findById(req.params.id)
    .populate('book')
    .exec(function (err, bookinstance) {
        if (err) { return next(err) }
        if (bookinstance==null) { // No results.
            res.redirect('/catalog/bookinstances')
        }
        res.status(200).json({ title: 'Delete BookInstance', bookinstance:  bookinstance })
    })

}

// Handle BookInstance delete on POST.
export const bookinstanceDeletePost = function(req, res, next) {
    
    // Assume valid BookInstance id in field.
    BookInstance.findByIdAndRemove(req.body.id, function deleteBookInstance(err) {
        if (err) { return next(err) }
        // Success, so redirect to list of BookInstance items.
        res.redirect('/catalog/bookinstances')
        })

}

// Display BookInstance update form on GET.
export const bookinstanceUpdateGet = function(req, res, next) {

    // Get book, authors and genres for form.
    async.parallel({
        bookinstance: function(callback) {
            BookInstance.findById(req.params.id).populate('book').exec(callback)
        },
        books: function(callback) {
            Book.find(callback)
        },

        }, function(err, results) {
            if (err) { return next(err) }
            if (results.bookinstance==null) { // No results.
                var err = new Error('Book copy not found')
                err.status = 404
                return next(err)
            }
            // Success.
            res.status(200).json({ title: 'Update  BookInstance', bookList : results.books, selectedBook : results.bookinstance.book._id, bookinstance:results.bookinstance })
        })

}

// Handle BookInstance update on POST.
export const bookinstanceUpdatePost = [

    // Validate fields.
    // body('book', 'Book must be specified').isLength({ min: 1 }).trim(),
    // body('imprint', 'Imprint must be specified').isLength({ min: 1 }).trim(),
    // body('dueBack', 'Invalid date').optional({ checkFalsy: true }).isISO8601(),
    
    // Sanitize fields.
    // sanitizeBody('book').escape(),
    // sanitizeBody('imprint').escape(),
    // sanitizeBody('status').escape(),
    // sanitizeBody('dueBack').toDate(),
    
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        // const errors = validationResult(req)

        // Create a BookInstance object with escaped/trimmed data and current id.
        var bookinstance = new BookInstance(
          { book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            dueBack: req.body.dueBack,
            _id: req.params.id
           })

        if (!errors.isEmpty()) {
            Book.find({},'title')
                .exec(function (err, books) {
                    if (err) { return next(err) }
                    res.status(200).json({ title: 'Update BookInstance', bookList : books, selectedBook : bookinstance.book._id , errors: 'errors', bookinstance:bookinstance })
            })
            return
        }
        else {
            // Data from form is valid.
            BookInstance.findByIdAndUpdate(req.params.id, bookinstance, {}, function (err,thebookinstance) {
                if (err) { return next(err) }
                   // Successful - redirect to detail page.
                   res.redirect(thebookinstance.url)
                })
        }
    }
]
