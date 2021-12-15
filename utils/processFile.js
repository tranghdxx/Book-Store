const multer = require('multer')
const path = require('path')
const fs = require('fs')

const uploadPath = path.join('public', 'images')
const upload = multer({dest: uploadPath})

const uploadFile = (name, isArray) => isArray ? upload.array(name) : upload.single(name)

const removeFile = filename => {
  return fs.unlink(path.join(uploadPath, filename))
}


module.exports = {
  uploadPath,
  uploadFile,
  removeFile
}