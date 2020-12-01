const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, res, callback) => {
    callback(null, './uploads/')
  },
  filename: (req, file, callback) => {
    const field = req.route.path.split('/')[1]
    const extension = file.originalname.split('.').pop()
    const fileName = field + '-' + Date.now() + '.' + extension
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

const upload = multer({ storage, fileFilter, limits }).single('image')

const uploadFilter = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.status(400).send({
        success: false,
        message: err.message
      })
    } else if (err) {
      res.status(400).send({
        success: false,
        message: err.message
      })
    }
    next()
  })
}

module.exports = uploadFilter
