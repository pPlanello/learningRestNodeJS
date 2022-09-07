const { request, response } = require("express");

const validFileField = (req = request, res = response, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400)
            .json({msg : 'The field file is mandatory.'});
    }
    next();
}

module.exports = {
    validFileField
}