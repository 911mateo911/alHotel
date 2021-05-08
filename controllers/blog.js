const asyncWrap = require('../middlewares/asyncWrap')
const Blog = require('../models/blog')
const { cloudinary } = require('../cloudinary')

module.exports.newBlogShow = (req, res) => {
    const blog = {
        title: '',
        subtitle: '',
        description: ''
    }
    res.render('blogs/newBlog', {
        blog,
        title: 'Post a new blog',
        subtitle: 'Tell a story of your favourite holiday',
        method: 'POST'
    })
}

module.exports.showBlog = asyncWrap(async (req, res) => {
    const { ID } = req.params
    const blog = await Blog.findByIdAndUpdate(ID, { $inc: { seen: 1 } }, { new: true }).populate('author').populate({
        path: 'comments', populate: { path: 'author' },
        options: { sort: { dateCreated: 'desc' } }
    })
    res.render('blogs/showBlog', {
        blog,
        title: `${blog.title}`
    })
})

module.exports.newBlogSave = asyncWrap(async (req, res) => {
    const blog = new Blog(req.body.blog)
    blog.photo = req.files.map(file => ({
        url: file.path,
        filename: file.filename
    }))
    blog.author = req.user._id
    await blog.save()
    req.flash('success', 'Success :)')
    res.redirect(`/blog/${blog._id}`)
})

module.exports.editBlogShow = asyncWrap(async (req, res) => {
    const { ID } = req.params
    const blog = await Blog.findById(ID)
    res.render('blogs/newBlog', {
        blog,
        method: 'PUT',
        title: `Edit ${blog.name}`,
        subtitle: 'Did you write something wrong?'
    })
})

module.exports.editBlogSave = asyncWrap(async (req, res) => {
    const { ID } = req.params
    const blog = await Blog.findOneAndUpdate({ _id: ID }, req.body.blog)
    const images = req.files.map(file => ({
        url: file.path,
        filename: file.filename
    }))
    blog.photo.push(...images)
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename)
        }
        await blog.updateOne({ $pull: { photo: { filename: { $in: req.body.deleteImages } } } })
        blog.photo = blog.photo.filter((el) => !req.body.deleteImages.includes(el.filename))
    }
    await blog.save()
    req.flash('success', 'Success :)')
    res.redirect(`/blog/${ID}`)
})

module.exports.deleteBlog = asyncWrap(async (req, res) => {
    const { ID } = req.params
    const blog = await Blog.findById(ID)
    for (let photo of blog.photo) {
        await cloudinary.uploader.destroy(photo.filename)
    }
    await Blog.findOneAndDelete({ _id: ID })
    req.flash('success', "It's Gone")
    res.redirect('/')
})