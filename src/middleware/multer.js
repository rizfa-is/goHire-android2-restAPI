const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, res, callback) => {
    callback(null, './uploads/')
  },
  filename: (req, file, callback) => {
    const extension = file.originalname.split('.').pop()
    const fileName = file.fieldname + '-' + Date.now() + '.' + extension
    callback(null, fileName)
  }
})

const fileFilter = (req, file, callback) => {
  if ((file.mimetype === 'image/jpeg') || (file.mimetype === 'image/png')) {
    callback(null, true)
  } else {
    return callback(new Error('Extension file must be JPG or PNG'), false)
  }
}

const limits = { fileSize: 1024 * 1024 * 1 }

const upload = multer({ storage, fileFilter, limits }).fields([
  { name: 'pj_img', maxCount: 1 },
  { name: 'pr_img', maxCount: 1 },
  { name: 'en_avatar', maxCount: 1 },
  { name: 'cp_img', maxCount: 1 }
])

const uploadFilter = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.status(400).send({
        success: false,
        message: 'A Multer error occurred when uploading.'
      })
    } else if (err) {
      // An unknown error occurred when uploading.
      res.status(400).send({
        success: false,
        message: 'An unknown error occurred when uploading.'
      })
    }
    next()
  })
}

module.exports = uploadFilter
