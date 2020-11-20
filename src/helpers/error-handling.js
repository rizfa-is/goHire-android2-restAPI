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
      message: 'Unfortunely, Email already exist!'
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
  },
  // GET Engineer Nested
  nestedJSONFunction: (values, res) => {
    // lakukan akumulasi
    const hasil = values.reduce((akumulasikan, item) => {
      // tentukan key group
      if (akumulasikan[item.ac_name]) {
        // buat variabel group nama engineer
        const group = akumulasikan[item.ac_name]
        // cek jika isi array adalah skill
        if (Array.isArray(group.skill)) {
          group.skill.push(item.skill)
        } else {
          group.skill = [group.skill, item.skill]
        }
      } else {
        akumulasikan[item.ac_name] = item
      }
      return akumulasikan
    }, {})

    const data = {
      success: true,
      message: 'Horay, Engineer List is loaded!',
      database: hasil
    }

    res.json(data)
    res.end()
  }
}
