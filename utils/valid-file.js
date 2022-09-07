const { request, response } = require("express");

const validExtensionFile = (file) => {
    const [name, extension] = file.name.split('.');
    
    const validExtension = process.env.VALID_EXTENSIONS_FILE;
    const validExtensions = validExtension.split(',');

    return validExtensions.includes(extension);
}

const validSizeFile = (file) => {
    // File in MB
    const sizeFile = file.size/(1024*1024);

    return sizeFile < process.env.MAX_SIZE_FILE_MB;
}

const validFileField = (req = request, res = response, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400)
            .json({msg : 'The field file is mandatory.'});
    }
    next();
}

module.exports = {
    validExtensionFile,
    validSizeFile,
    validFileField
}