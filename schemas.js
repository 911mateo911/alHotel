const Joi = require('joi')
const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/
const usernameRegex = /^[\w+\s+0-9]{8,}$/
const SanitizeHtml = require('sanitize-html');

const customJoi = Joi.extend((joi) => {

    return {

        type: 'string',
        base: joi.string(),
        messages: {
            'string.htmlStrip': '{{#label}} must not include HTML!'
        },
        rules: {
            htmlStrip: {
                validate(value, helpers) {
                    const clean = SanitizeHtml(value, {
                        allowedTags: ["address", ">", "<", ">>>", "<<<<", "article", "aside", "footer", "header", "h1", "h2", "h3", "h4",
                            "h5", "h6", "hgroup", "main", "nav", "section", "blockquote", "dd", "div",
                            "dl", "dt", "figcaption", "figure", "hr", "li", "main", "ol", "p", "pre",
                            "ul", "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn",
                            "em", "i", "kbd", "mark", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp",
                            "small", "span", "strong", "sub", "sup", "time", "u", "var", "wbr", "caption",
                            "col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr"],
                        allowedAttributes: {},
                    });
                    if (clean !== value) return helpers.error('string.htmlStrip', { value })
                    return clean;
                }
            }
        }
    };
});

module.exports.querySchema = customJoi.object({
    page: customJoi.number().optional(),
    q: customJoi.string().min(1).max(200).htmlStrip().pattern(/[$\(\)<>]/, { invert: true }).required(),
    content: customJoi.string().valid('Stays', 'Blogs').htmlStrip().optional()
})

module.exports.hotelSchema = customJoi.object({
    hotel: customJoi.object({
        name: customJoi.string().min(10).max(200).required(),
        price: customJoi.string().min(10).max(200).required(),
        description: customJoi.string().min(10).max(5000).required(),
        location: customJoi.string().min(10).max(200).required(),
        contact: customJoi.string().optional().max(200).allow(''),
        photo: customJoi.string().optional().allow(' ')
    }).required(),
    deleteImages: customJoi.array()
})

module.exports.profileScrollSchema = customJoi.object({
    page: customJoi.number().optional(),
    content: customJoi.string().valid('Stays', 'Blogs').htmlStrip().optional()
})

module.exports.commentSchema = customJoi.object({
    comment: customJoi.object({
        body: customJoi.string().min(5).max(2000).required(),
        dateCreated: customJoi.date().optional(),
    }).required()
})

module.exports.discussionSchema = customJoi.object({
    discuss: customJoi.object({
        topic: customJoi.string().min(2).max(50).required(),
        body: customJoi.string().max(2000).min(5).required()
    })
})

module.exports.paramSchema = customJoi.string().htmlStrip()

module.exports.blogSchema = customJoi.object({
    blog: customJoi.object({
        title: customJoi.string().min(10).max(200).required(),
        subtitle: customJoi.string().min(10).max(200).required(),
        description: customJoi.string().min(10).max(10000).required(),
        photo: customJoi.string().optional().allow(' ')
    }).required(),
    deleteImages: customJoi.array()
})

module.exports.reviewSchema = customJoi.object({
    review: customJoi.object({
        rating: customJoi.number().min(1).max(5).required(),
        body: customJoi.string().min(10).max(500).required(),
        dateCreated: customJoi.date().optional()
    }).required()
})

module.exports.userSchema = customJoi.object({
    email: customJoi.string().regex(emailRegex).required(),
    username: customJoi.string().regex(usernameRegex).required(),
    password: customJoi.string().regex(passwordRegex).required()
})