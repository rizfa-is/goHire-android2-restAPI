const { getAllProjectModul, getProjectByIdModul, createProjectModul, deleteProjectModul, updateProjectModul, parsialUpdateProjectModul, parsialUpdateProjectModul2 } = require('../models/project')
const { successProjectHandling, errorProjectHandling, errorInternalProjectHandling } = require('../helpers/error-handling')

module.exports = {
  getAllProject: async (req, res) => {
    try {
      let { search, limit, page } = req.query
      let searchKey = ''
      let searchValue = ''

      if (typeof search === 'object') {
        searchKey = Object.keys(search)[0]
        searchValue = Object.values(search)[0]
      } else {
        searchKey = 'pj_name'
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

      const offset = (page - 1) * limit

      const result = await getAllProjectModul(searchKey, searchValue, limit, offset)
      if (result.length) {
        successProjectHandling(res, result)
      } else {
        errorProjectHandling(res)
      }
    } catch (err) {
      errorInternalProjectHandling(res)
    }
  },
  getProjectById: async (req, res) => {
    try {
      const { pj_id } = req.params

      const result = await getProjectByIdModul(pj_id)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: `Project with id ${pj_id}`,
          data: result[0]
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Data project with id ' + pj_id + ' not found'
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  createProject: async (req, res) => {
    try {
      const data = req.body

      console.log(req.body.ac_name)
      const result = await createProjectModul(data, 'Engineer')

      if (result.affectedRows) {
        successProjectHandling(res, result)
      } else {
        errorProjectHandling(res)
      }
    } catch (error) {
      errorInternalProjectHandling(res)
    }
  },
  parsialUpdateProject: async (req, res) => {
    try {
      const { en_id } = req.params
      const data = req.body

      const result = await getProjectByIdModul(en_id)
      if (result.length) {
        const result2 = await updateProjectModul(data, en_id)
        if (result2.affectedRows) {
          res.status(200).send({
            success: true,
            message: `Item project id ${en_id} has been deleted!`
          })
        } else {
          res.status(404).send({
            success: false,
            message: 'Item project failed to delete!'
          })
        }
      } else {
        res.status(404).send({
          success: false,
          message: 'Item project failed to delete!'
        })
      }
    } catch (error) {
      res.status(400).send({
        success: false,
        message: 'Data project not found'
      })
    }
  }
}
