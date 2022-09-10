const { request, response } = require('express');
const fs = require('fs');
const path = require('path');
const { validExtensionFile, validSizeFile } = require('../utils/valid-file');


const uploadFiles = (req = request, res = response) => {
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

const getUploadFile = (req = request, res = response) => {
    const {name} = req.params;
    if (!fs.existsSync('./uploads/'+name)) {
        res.status(404).json({msg: `The file ${name} is not exist.`})
    }
    
    const file = fs.readFileSync('./uploads/'+name, (err, file) => {
        if (err) {
            console.error(err);
            res.status(500).json({msg : err});
        }
        return file;
    });
    
    res.end(file);
}


module.exports = {
    uploadFiles,
    getUploadFile
}