const { request, response } = require('express');
const path = require('path');
const { validExtensionFile, validSizeFile } = require('../utils/valid-file');


const uploadFiles = (req = request, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400)
            .json({msg : 'No files to upload.'});
        return;
    }

    const {file} = req.files;
    
    if (!validExtensionFile(file)) {
        res.status(400)
            .json({
                msg: `No valid extension file to upload. The extension can be upload is: ' + ${process.env.VALID_EXTENSIONS_FILE}`
            });
    }

    if (!validSizeFile(file)) {
        res.status(400)
            .json({
                msg: `No valid size file to upload. The max size to upload is: ${process.env.MAX_SIZE_FILE_MB} MB`
            });
    }

    const filePath = path.join(__dirname, '../uploads/', file.name);

    file.mv(filePath, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }
        res.json({msg: `File ${file.name} uploaded.`});
    });
    
}


module.exports = {
    uploadFiles
}