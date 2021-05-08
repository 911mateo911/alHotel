const express = require('express')
const router = express.Router()
const { newBlogShow, newBlogSave, editBlogShow, editBlogSave, showBlog, deleteBlog } = require('../controllers/blog')
const { isLoggedIn, isBlogAuthor } = require('../middlewares/priviledges')
const { uploadPhotos, validateBlog, editBlogPhotos } = require('../middlewares/validators')

router.get('/new', isLoggedIn, newBlogShow)

router.post('/', isLoggedIn, uploadPhotos, validateBlog, newBlogSave)

router.get('/:ID/edit', isLoggedIn, isBlogAuthor, editBlogShow)

router.route('/:ID')
    .get(showBlog)
    .put(isLoggedIn, isBlogAuthor, editBlogPhotos, validateBlog, editBlogSave)
    .delete(isLoggedIn, isBlogAuthor, deleteBlog)

module.exports = router