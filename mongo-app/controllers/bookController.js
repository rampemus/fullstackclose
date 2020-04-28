import Book from '../models/book.js'
import Author from '../models/author.js'
import Genre from '../models/genre.js'
import BookInstance from '../models/bookinstance.js'

const { body,validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

import async from 'async'

exports.index = function(req, res) {

  async.parallel({
    bookCount: function(callback) {
      Book.count(callback)
    },
    bookInstanceCount: function(callback) {
      BookInstance.count(callback)
    },
    bookInstanceAvailableCount: function(callback) {
      BookInstance.count({status:'Available'},callback)
    },
    authorCount: function(callback) {
      Author.count(callback)
    },
    genreCount: function(callback) {
      Genre.count(callback)
    },
  }, function(err, results) {
    res.render('index', { title: 'Local Library Home', error: err, data: results })
  })
}


// Display list of all books.
exports.bookList = function(req, res, next) {

  Book.find({}, 'title author')
  .populate('author').exec(function (err, listBooks) {
    if (err) {return next(err)} 
    else {
      // Successful, so render
      res.render('bookList', { title: 'Book List', bookList:  listBooks})
    }
  })

}

// Display detail page for a specific book.
exports.bookDetails = function(req, res, next) {

  async.parallel({
    book: function(callback) {

      Book.findById(req.params.id)
        .populate('author')
        .populate('genre')
        .exec(callback)
    },
    bookInstance: function(callback) {

      BookInstance.find({ 'book': req.params.id })
      .exec(callback)
    },
  }, function(err, results) {
    if (err) { return next(err) }
    if (results.book==null) { // No results.
      var err = new Error('Book not found')
      err.status = 404
      return next(err)
    }
    // Successful, so render.
    res.render('bookDetails', { title: 'Title', book:  results.book, bookInstances: results.bookInstance } )
  })

}

// Display book create form on GET.
exports.bookCreateGet = function(req, res, next) {

  // Get all authors and genres, which we can use for adding to our book.
  async.parallel({
    authors: function(callback) {
      Author.find(callback)
    },
    genres: function(callback) {
      Genre.find(callback)
    },
  }, function(err, results) {
    if (err) { return next(err) }
    res.render('bookForm', { title: 'Create Book',authors:results.authors, genres:results.genres })
  })

}

// Handle book create on POST.
exports.bookCreatePost = [
  // Convert the genre to an array.
  (req, res, next) => {
    if(!(req.body.genre instanceof Array)){
      if(typeof req.body.genre==='undefined')
      req.body.genre=[]
      else
      req.body.genre=new Array(req.body.genre)
    }
    next()
  },

  // Validate fields.
  body('title', 'Title must not be empty.').isLength({ min: 1 }).trim(),
  body('author', 'Author must not be empty.').isLength({ min: 1 }).trim(),
  body('summary', 'Summary must not be empty.').isLength({ min: 1 }).trim(),
  body('isbn', 'ISBN must not be empty').isLength({ min: 1 }).trim(),
  
  // Sanitize fields.
  sanitizeBody('*').escape(),
  sanitizeBody('genre.*').escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    

    // Extract the validation errors from a request.
    const errors = validationResult(req)

    // Create a Book object with escaped and trimmed data.
    var book = new Book(
      { title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre
       })

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all authors and genres for form.
      async.parallel({
        authors: function(callback) {
          Author.find(callback)
        },
        genres: function(callback) {
          Genre.find(callback)
        },
      }, function(err, results) {
        if (err) { return next(err) }

        // Mark our selected genres as checked.
        for (let i = 0; i < results.genres.length; i++) {
          if (book.genre.indexOf(results.genres[i]._id) > -1) {
            results.genres[i].checked='true'
          }
        }
        res.render('bookForm', { title: 'Create Book',authors:results.authors, genres:results.genres, book: book, errors: errors.array() })
      })
      return
    }
    else {
      // Data from form is valid. Save book.
      book.save(function (err) {
        if (err) { return next(err) }
           // Successful - redirect to new book record.
           res.redirect(book.url)
        })
    }
  }
]



// Display book delete form on GET.
exports.bookDeleteGet = function(req, res, next) {

  async.parallel({
    book: function(callback) {
      Book.findById(req.params.id).populate('author').populate('genre').exec(callback)
    },
    bookBookInstances: function(callback) {
      BookInstance.find({ 'book': req.params.id }).exec(callback)
    },
  }, function(err, results) {
    if (err) { return next(err) }
    if (results.book==null) { // No results.
      res.redirect('/catalog/books')
    }
    // Successful, so render.
    res.render('bookDelete', { title: 'Delete Book', book: results.book, bookInstances: results.bookBookInstances } )
  })

}

// Handle book delete on POST.
exports.bookDeletePost = function(req, res, next) {

  // Assume the post has valid id (ie no validation/sanitization).

  async.parallel({
    book: function(callback) {
      Book.findById(req.body.id).populate('author').populate('genre').exec(callback)
    },
    bookBookInstances: function(callback) {
      BookInstance.find({ 'book': req.body.id }).exec(callback)
    },
  }, function(err, results) {
    if (err) { return next(err) }
    // Success
    if (results.bookBookInstances.length > 0) {
      // Book has bookInstances. Render in same way as for GET route.
      res.render('bookDelete', { title: 'Delete Book', book: results.book, bookInstances: results.bookBookInstances } )
      return
    }
    else {
      // Book has no BookInstance objects. Delete object and redirect to the list of books.
      Book.findByIdAndRemove(req.body.id, function deleteBook(err) {
        if (err) { return next(err) }
        // Success - got to books list.
        res.redirect('/catalog/books')
      })

    }
  })

}

// Display book update form on GET.
exports.bookUpdateGet = function(req, res, next) {

  // Get book, authors and genres for form.
  async.parallel({
    book: function(callback) {
      Book.findById(req.params.id).populate('author').populate('genre').exec(callback)
    },
    authors: function(callback) {
      Author.find(callback)
    },
    genres: function(callback) {
      Genre.find(callback)
    },
    }, function(err, results) {
      if (err) { return next(err) }
      if (results.book==null) { // No results.
        var err = new Error('Book not found')
        err.status = 404
        return next(err)
      }
      // Success.
      // Mark our selected genres as checked.
      for (var all_g_iter = 0; all_g_iter < results.genres.length; all_g_iter++) {
        for (var book_g_iter = 0; book_g_iter < results.book.genre.length; book_g_iter++) {
          if (results.genres[all_g_iter]._id.toString()==results.book.genre[book_g_iter]._id.toString()) {
            results.genres[all_g_iter].checked='true'
          }
        }
      }
      res.render('bookForm', { title: 'Update Book', authors:results.authors, genres:results.genres, book: results.book })
    })

}


// Handle book update on POST.
exports.book_update_post = [

  // Convert the genre to an array.
  (req, res, next) => {
    if(!(req.body.genre instanceof Array)){
      if(typeof req.body.genre==='undefined')
      req.body.genre=[]
      else
      req.body.genre=new Array(req.body.genre)
    }
    next()
  },
   
  // Validate fields.
  body('title', 'Title must not be empty.').isLength({ min: 1 }).trim(),
  body('author', 'Author must not be empty.').isLength({ min: 1 }).trim(),
  body('summary', 'Summary must not be empty.').isLength({ min: 1 }).trim(),
  body('isbn', 'ISBN must not be empty').isLength({ min: 1 }).trim(),

  // Sanitize fields.
  sanitizeBody('title').escape(),
  sanitizeBody('author').escape(),
  sanitizeBody('summary').escape(),
  sanitizeBody('isbn').escape(),
  sanitizeBody('genre.*').escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {

    // Extract the validation errors from a request.
    const errors = validationResult(req)

    // Create a Book object with escaped/trimmed data and old id.
    var book = new Book(
      { title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: (typeof req.body.genre==='undefined') ? [] : req.body.genre,
      _id:req.params.id // This is required, or a new ID will be assigned!
       })

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all authors and genres for form
      async.parallel({
        authors: function(callback) {
          Author.find(callback)
        },
        genres: function(callback) {
          Genre.find(callback)
        },
      }, function(err, results) {
        if (err) { return next(err) }

        // Mark our selected genres as checked.
        for (let i = 0; i < results.genres.length; i++) {
          if (book.genre.indexOf(results.genres[i]._id) > -1) {
            results.genres[i].checked='true'
          }
        }
        res.render('bookForm', { title: 'Update Book',authors:results.authors, genres:results.genres, book: book, errors: errors.array() })
      })
      return
    }
    else {
      // Data from form is valid. Update the record.
      Book.findByIdAndUpdate(req.params.id, book, {}, function (err,thebook) {
        if (err) { return next(err) }
           // Successful - redirect to book detail page.
           res.redirect(thebook.url)
        })
    }
  }
]
