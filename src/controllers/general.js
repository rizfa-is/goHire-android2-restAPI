const {
  createAccountModul, getAllModul, getAllEngineerModul, getEngineerByIdModul, getAbilityByIdModul, getAllAbilityModul,
  getAllPortfolioModul, getPortfolioByIdModul, getAllExperienceModul, getExperienceByIdModul, getAllCompanyModul, getCompanyByIdModul
} = require('../models/general')

const { successRegisterHandling, errorRegisterHandling, errorInternalHandling } = require('../helpers/error-handling')
const errorHandling = require('../helpers/error-handling')

module.exports = {
  // === Login Page ===
  // Register engineer
  createEngineerAccount: async (req, res) => {
    try {
      const { ac_name, ac_email, ac_phone, ac_password } = req.body
      const data = {
        ac_name: ac_name, ac_email: ac_email, ac_phone: ac_phone, ac_password: ac_password, ac_level: 'Engineer'
      }

      console.log(req.body.ac_name)
      const result = await createAccountModul(data, 'Engineer')

      if (result.affectedRows) {
        successRegisterHandling(res, result)
      } else {
        errorHandling(res)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  // Register company
  createCompanyAccount: async (req, res) => {
    try {
      const { ac_name, ac_email, ac_phone, ac_password, cp_company, cp_position } = req.body
      const data = {
        ac_name: ac_name, ac_email: ac_email, ac_phone: ac_phone, ac_password: ac_password, ac_level: 'Company'
      }

      const result = await createAccountModul(data, 'Company', cp_company, cp_position)

      if (result.affectedRows) {
        successRegisterHandling(res, result)
      } else {
        errorHandling(res)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  getAllEngineer: async (req, res) => {
    try {
      let { search, limit, page, filter } = req.query
      let searchKey = ''
      let searchValue = ''

      if (typeof search === 'object') {
        searchKey = Object.keys(search)[0]
        searchValue = Object.values(search)[0]
      } else {
        searchKey = 'ac_name'
        searchValue = search || ''
      }

      if (!limit) {
        limit = 50
      } else {
        limit = parseInt(limit)
      }

      if (!page) {
        page = 1
      } else {
        page = parseInt(page)
      }

      if (!filter) {
        filter = 0
      } else {
        filter = parseInt(filter)
      }

      const offset = (page - 1) * limit
      const result = await getAllEngineerModul(searchKey, searchValue, limit, offset, filter)
      if (result.length) {
        successRegisterHandling(res, result)
      } else {
        errorRegisterHandling(res)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  getEngineerById: async (req, res) => {
    try {
      const { en_id } = req.params
      const result = await getEngineerByIdModul(en_id)
      if (result.length) {
        successRegisterHandling(res, result)
      } else {
        errorRegisterHandling(res)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  getAllAbility: async (req, res) => {
    try {
      const result = await getAllAbilityModul()
      if (result.length) {
        successRegisterHandling(res, result)
      } else {
        errorRegisterHandling(res)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  getAbilityById: async (req, res) => {
    try {
      const { en_id } = req.params
      const result = await getAbilityByIdModul(en_id)
      if (result.length) {
        successRegisterHandling(res, result)
      } else {
        errorRegisterHandling(res)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  // Engineer Detail Page
  getAllPortfolio: async (req, res) => {
    try {
      const result = await getAllPortfolioModul()
      console.log(result)
      if (result.length) {
        successRegisterHandling(res, result)
      } else {
        errorRegisterHandling(res)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  getPortfolioById: async (req, res) => {
    try {
      const { en_id } = req.params
      const result = await getPortfolioByIdModul(en_id)
      if (result.length) {
        successRegisterHandling(res, result)
      } else {
        errorRegisterHandling(res)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  getAllExperience: async (req, res) => {
    try {
      const result = await getAllExperienceModul()
      if (result.length) {
        successRegisterHandling(res, result)
      } else {
        errorRegisterHandling(res)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  getExperienceById: async (req, res) => {
    try {
      const { en_id } = req.params
      const result = await getExperienceByIdModul(en_id)
      if (result.length) {
        successRegisterHandling(res, result)
      } else {
        errorRegisterHandling(res)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  // Company Detail Page
  getAllCompany: async (req, res) => {
    try {
      let { search, limit, page, filter } = req.query
      let searchKey = ''
      let searchValue = ''

      if (typeof search === 'object') {
        searchKey = Object.keys(search)[0]
        searchValue = Object.values(search)[0]
      } else {
        searchKey = 'ac_name'
        searchValue = search || ''
      }

      if (!limit) {
        limit = 50
      } else {
        limit = parseInt(limit)
      }

      if (!page) {
        page = 1
      } else {
        page = parseInt(page)
      }

      if (!filter) {
        filter = 0
      } else {
        filter = parseInt(filter)
      }

      const offset = (page - 1) * limit
      const result = await getAllCompanyModul(searchKey, searchValue, limit, offset, filter)
      if (result.length) {
        successRegisterHandling(res, result)
      } else {
        errorRegisterHandling(res)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  getCompanyById: async (req, res) => {
    try {
      const { en_id } = req.params
      const result = await getCompanyByIdModul(en_id)
      if (result.length) {
        successRegisterHandling(res, result)
      } else {
        errorRegisterHandling(res)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  },
  getAcEnCp: async (req, res) => {
    try {
      const result = await getAllModul()
      if (result.length) {
        successRegisterHandling(res, result)
      } else {
        errorRegisterHandling(res)
      }
    } catch (error) {
      errorInternalHandling(res)
    }
  }
}
