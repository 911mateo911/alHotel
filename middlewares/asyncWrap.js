module.exports = asyncWrap

function asyncWrap (f) {
    return (req,res,next) => {
        f(req,res,next).catch(next)
    }
}