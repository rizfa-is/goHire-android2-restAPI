module.exports = {
  successRegisterHandling: (res, result) => {
    res.status(200).send({
      success: true,
      message: 'Horay, Register succesfull!',
      database: result
    })
  },
  errorRegisterHandling: (res) => {
    res.status(404).send({
      success: false,
      message: 'Unfortunely, Register unsuccesfull!'
    })
  },
  errorInternalHandling: (res) => {
    res.status(500).send({
      success: false,
      message: 'Oops, Internal Server Error!'
    })
  }
}
