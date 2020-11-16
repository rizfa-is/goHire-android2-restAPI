module.exports = {
  // Register Handling
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
  },
  // Project Handling
  successProjectHandling: (res, result) => {
    res.status(200).send({
      success: true,
      message: 'Horay, Project List Succesful!',
      database: result
    })
  },
  errorProjectHandling: (res) => {
    res.status(404).send({
      success: false,
      message: 'Unfortunely, Item project not found!'
    })
  },
  errorInternalProjectHandling: (res) => {
    res.status(500).send({
      success: false,
      message: 'Oops, Internal Server Error!'
    })
  },
  // Project Handling
  successHireHandling: (res, result) => {
    res.status(200).send({
      success: true,
      message: 'Horay, Hire process Succesfully!',
      database: result
    })
  },
  errorHireHandling: (res) => {
    res.status(404).send({
      success: false,
      message: 'Unfortunely, Hire process unsuccesfully!'
    })
  },
  errorInternalHireHandling: (res) => {
    res.status(500).send({
      success: false,
      message: 'Oops, Internal Server Error!'
    })
  }
}
