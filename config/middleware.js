//Using this export as middleware where ever we want to flash notification
module.exports.setFlash = function(req, res, next){

    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }

    next();
}