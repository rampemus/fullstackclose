
import Author from '../models/author.js'
import async from 'async'
import Book from '../models/book.js'

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

// Display list of all Authors.
exports.authorList = function (req, res, next) {

  Author.find()
    .sort([['familyName', 'ascending']])
    .exec(function (err, listAuthors) {
      if (err) { return next(err) }
      // Successful, so render.
      res.render('authorList', { title: 'Author List', authorList: listAuthors })
    })

}

// Display detail page for a specific Author.
exports.authorDetail = function (req, res, next) {

  async.parallel({
    author: function (callback) {
      Author.findById(req.params.id)
        .exec(callback)
    },
    authorsBooks: function (callback) {
      Book.find({ 'author': req.params.id }, 'title summary')
        .exec(callback)
    },
  }, function (err, results) {
    if (err) { return next(err) } // Error in API usage.
    if (results.author == null) { // No results.
      var err = new Error('Author not found')
      err.status = 404
      return next(err)
    }
    // Successful, so render.
    res.render('authorDetail', { title: 'Author Detail', author: results.author, authorBooks: results.authorsBooks })
  })

}

// Display Author create form on GET.
exports.authorCreateGet = function (req, res, next) {
  res.render('authorForm', { title: 'Create Author' })
}

// Handle Author create on POST.
exports.authorCreatePost = [

  // Validate fields.
  body('firstName').isLength({ min: 1 }).trim().withMessage('First name must be specified.')
    .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
  body('familyName').isLength({ min: 1 }).trim().withMessage('Family name must be specified.')
    .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
  body('dateOfBirth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601(),
  body('dateOfDeath', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601(),

  // Sanitize fields.
  sanitizeBody('firstName').escape(),
  sanitizeBody('familyName').escape(),
  sanitizeBody('dateOfBirth').toDate(),
  sanitizeBody('dateOfDeath').toDate(),

  // Process request after validation and sanitization.
  (req, res, next) => {

    // Extract the validation errors from a request.
    const errors = validationResult(req)
    
    // Create Author object with escaped and trimmed data
    var author = new Author(
      {
        firstName: req.body.firstName,
        familyName: req.body.familyName,
        dateOfBirth: req.body.dateOfBirth,
        dateOfDeath: req.body.dateOfDeath,
      }
    )

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render('authorForm', { title: 'Create Author', author: author, errors: errors.array() })
      return
    }
    else {
      // Data from form is valid.

      // Save author.
      author.save(function (err) {
        if (err) { return next(err) }
        // Successful - redirect to new author record.
        res.redirect(author.url)
      })
    }
  }
]



// Display Author delete form on GET.
exports.authorDeleteGet = function (req, res, next) {

  async.parallel({
    author: function (callback) {
      Author.findById(req.params.id).exec(callback)
    },
    authorsBooks: function (callback) {
      Book.find({ 'author': req.params.id }).exec(callback)
    },
  }, function (err, results) {
    if (err) { return next(err) }
    if (results.author == null) { // No results.
      res.redirect('/catalog/authors')
    }
    // Successful, so render.
    res.render('authorDelete', { title: 'Delete Author', author: results.author, authorBooks: results.authorsBooks })
  })

}

// Handle Author delete on POST.
exports.authorDeletePost = function (req, res, next) {

  async.parallel({
    author: function (callback) {
      Author.findById(req.body.authorid).exec(callback)
    },
    authorsBooks: function (callback) {
      Book.find({ 'author': req.body.authorid }).exec(callback)
    },
  }, function (err, results) {
    if (err) { return next(err) }
    // Success.
    if (results.authorsBooks.length > 0) {
      // Author has books. Render in same way as for GET route.
      res.render('authorDelete', { title: 'Delete Author', author: results.author, authorBooks: results.authorsBooks })
      return
    }
    else {
      // Author has no books. Delete object and redirect to the list of authors.
      Author.findByIdAndRemove(req.body.authorid, function deleteAuthor(err) {
        if (err) { return next(err) }
        // Success - go to author list.
        res.redirect('/catalog/authors')
      })

    }
  })

}

// Display Author update form on GET.
exports.authorUpdateGet = function (req, res, next) {

  Author.findById(req.params.id, function (err, author) {
    if (err) { return next(err) }
    if (author == null) { // No results.
      var err = new Error('Author not found')
      err.status = 404
      return next(err)
    }
    // Success.
    res.render('authorForm', { title: 'Update Author', author: author })

  })
}

// Handle Author update on POST.
exports.authorUpdatePost = [

  // Validate fields.
  body('firstName').isLength({ min: 1 }).trim().withMessage('First name must be specified.')
    .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
  body('familyName').isLength({ min: 1 }).trim().withMessage('Family name must be specified.')
    .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
  body('dateOfBirth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601(),
  body('dateOfDeath', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601(),

  // Sanitize fields.
  sanitizeBody('firstName').escape(),
  sanitizeBody('familyName').escape(),
  sanitizeBody('dateOfBirth').toDate(),
  sanitizeBody('dateOfDeath').toDate(),

  // Process request after validation and sanitization.
  (req, res, next) => {

    // Extract the validation errors from a request.
    const errors = validationResult(req)

    // Create Author object with escaped and trimmed data (and the old id!)
    var author = new Author(
      {
        firstName: req.body.firstName,
        familyName: req.body.familyName,
        dateOfBirth: req.body.dateOfBirth,
        dateOfDeath: req.body.dateOfDeath,
        _id: req.params.id
      }
    )

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values and error messages.
      res.render('authorForm', { title: 'Update Author', author: author, errors: errors.array() })
      return
    }
    else {
      // Data from form is valid. Update the record.
      Author.findByIdAndUpdate(req.params.id, author, {}, function (err, theauthor) {
        if (err) { return next(err) }
        // Successful - redirect to genre detail page.
        res.redirect(theauthor.url)
      })
    }
  }
]
