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
      message: 'Unfortunely, Email already exist!'
    })
  },
  successLoginHandling: (res, result) => {
    res.status(200).send({
      success: true,
      message: 'Horay, Successfully login!',
      database: result
    })
  },
  passwordLoginHandling: (res) => {
    res.status(400).send({
      success: false,
      message: 'Sorry, Wrong Password!'
    })
  },
  emailLoginHandling: (res) => {
    res.status(400).send({
      success: false,
      message: 'Unfortunely, Your email is not registered!'
    })
  },
  successGetHandling: (res, result, scope) => {
    res.status(200).send({
      success: true,
      message: `Horay, ${scope} list successfully loaded!`,
      database: result
    })
  },
  successGetByIdHandling: (res, scope, id, result) => {
    res.status(200).send({
      success: true,
      message: `Horay, Data ${scope} with id ${id} successfully loaded!`,
      database: result
    })
  },
  failGetByIdHandling: (res, scope, id) => {
    res.status(404).send({
      success: false,
      message: `Horay, Data ${scope} with id ${id} successfully loaded!`
    })
  },
  successCreateHandling: (res, scope) => {
    res.status(200).send({
      success: true,
      message: `Horay, ${scope} successfully added!`
    })
  },
  failCreateHandling: (res, scope) => {
    res.status(400).send({
      success: false,
      message: `Unfortunely, ${scope} failed to added!`
    })
  },
  successUpdateHandling: (res, id, scope) => {
    res.status(200).send({
      success: true,
      message: `Horay, Item ${scope} id ${id} has been updated!`
    })
  },
  failUpdateHandling: (res, scope) => {
    res.status(404).send({
      success: false,
      message: `Unfortunely, Item ${scope} failed to updated!`
    })
  },
  successDeleteHandling: (res, id, scope) => {
    res.status(200).send({
      success: true,
      message: `Horay, Item ${scope} id ${id} has been deleted!`
    })
  },
  failDeleteHandling: (res, scope, id) => {
    res.status(404).send({
      success: false,
      message: `Unfortunely, Item ${scope} id ${id} failed to deleted!`
    })
  },
  methodErrorHandling: (res, scope) => {
    res.status(400).send({
      success: false,
      message: `Oops, Data ${scope} not found`
    })
  },
  errorInternalHandling: (res) => {
    res.status(500).send({
      success: false,
      message: 'Oops, Internal Server Error!'
    })
  },
  nestedJSONObjectEngineer: (res, values, key, id) => {
    const rest = values.reduce((accumulate, item) => {
      if (accumulate[item.ac_name]) {
        const group = accumulate[item.ac_name]

        if (Array.isArray(group.skill)) {
          group.skill.push(item.skill)
        } else {
          group.skill = [group.skill, item.skill]
        }

        if (Array.isArray(group.portfolio)) {
          group.portfolio.push(item.portfolio)
        } else {
          group.portfolio = [group.portfolio, item.portfolio]
        }
      } else {
        accumulate[item.ac_name] = item
      }
      return accumulate
    }, {})

    const result = rest
    let data = { }
    if (key === 0) {
      data = {
        success: true,
        message: 'Horay, engineer list successfully loaded!',
        database: result
      }
    } else if (key === 1) {
      data = {
        success: true,
        message: `Horay, engineer with id ${id} successfully loaded!`,
        database: result
      }
    }

    res.status(200).json(data)
    res.end()
  },
  nestedJSONObjectCompany: (res, values, key, id) => {
    const result = values.reduce((accumulate, item) => {
      if (accumulate[item.ac_name]) {
        const group = accumulate[item.ac_name]

        if (Array.isArray(group.project)) {
          group.project.push(item)
        } else {
          group.project = [group.project, item.project]
        }
      } else {
        accumulate[item.ac_name] = item
      }
      return accumulate
    }, {})

    let data = { }
    if (key === 0) {
      data = {
        success: true,
        message: 'Horay, company list successfully loaded!',
        database: result
      }
    } else if (key === 1) {
      data = {
        success: true,
        message: `Horay, company with id ${id} successfully loaded!`,
        database: result
      }
    }

    res.status(200).json(data)
    res.end()
  }
}
