
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



module.exports = {
    validExtensionFile,
    validSizeFile
}