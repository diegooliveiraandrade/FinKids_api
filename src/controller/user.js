const { response } = require('express')
const Users = require('../model/user')

class UsersController {

  async create(req, res) {

    const { name, email, password } = req.body

    const user = await Users.findOne({ email })

    if (!user) {
      const wallet = 0
      await Users.create({ name, email, password, wallet })
      return res.status(200).json("Usuário criado com sucesso!")
    }
    return res.status(400).json("Usuário já existe!")
  }

  async login(req, res) {
    const { email, password } = req.body

    const user = await Users.findOne({ email, password })

    if (user) {
      return res.send({ '_id': user._id, 'name': user.name, 'email': user.email })
    }
    return res.status(400).json('email/senha inválido')
  }

  async forgotPassword(req, res) {
    const { name, email } = req.body

    const user = await Users.findOne({ name, email })

    if (user) {
      return res.send(user.password)
    }
    return res.send("dado inválido")
  }

  async show(req, res) {

    await Users.findOne({
      _id: {
        '$in': req.params.id
      }

    }).sort('when')
      .then(response => {
        return res.status(200).json(response)
      })
      .catch(error => {
        return res.status(500).json(error)
      })
  }

  async update(req, res) {
    const { product, description, value, desire, when } = req.body
    await Users.findByIdAndUpdate(req.params.id,
      { $push: { spent: { product: product, description: description, value: value, desire: desire, when: when } } },
      {
        new: true,
      }
    ).then(response => {
      return res.status(200).json(response)
    }).catch(error => {
      return res.status(404).json(error)
    })

  }

  async delete(req, res) {
    const { _id } = req.body
    await Users.findByIdAndUpdate(req.params.id,
      { $pull: { spent: { _id: _id } } },
      {
        new: true,
      }).then(response => {
        return res.status(200).json(response)
      }).catch(error => {
        return res.status(404).json(error)
      })
  }
  async updateWallet(req, res) {

    const { _id } = req.params
    const { wallet } = req.body
    const totalWallet = await Users.updateOne({ id: _id }, {
      wallet: wallet

    })
    return res.json(totalWallet)

  }


}


module.exports = new UsersController