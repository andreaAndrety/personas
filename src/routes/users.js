const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { verificaToken } = require('../middlewares/autenticacion')

const Users = require('../models/users');


const router = express.Router();

router.get('/user', verificaToken, async(req, res) => {

    try {

        const users = await Users.find()

        res.json({
            ok: true,
            users
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            error
        })

    }
})

router.get('/login', async(req, res) => {

    const body = req.body;

    try {

        const users = await Users.findOne({ numeroIdentificacion: body.identificacion })

        if (!users) {
            return res.json({
                ok: true,
                messagge: " No fue posible autenticarse"
            })
        }

        let token = jwt.sign({
            usuario: users._id
        }, process.env.SEMILLA, { expiresIn: process.env.CADUCIDAD_TOKEN });


        res.json({
            ok: true,
            messagge: "Autenticacion exitosa",
            token
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            error
        })

    }

})

router.get('/user/:id', verificaToken, async(req, res) => {
    const id = req.params.id

    try {

        const users = await Users.findOne({ _id: id })

        res.json({
            ok: true,
            users
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            error
        })

    }

})

router.post('/user', verificaToken, async(req, res) => {

    const body = req.body;

    try {

        const userDb = new Users(body);
        await userDb.save();

        res.json({
            ok: true,
            messagge: 'guardado',
            userDb
        })

    } catch (error) {

        res.status(500).json({

            ok: false,
            error
        })

    }

})

router.put('/user/:id', verificaToken, async(req, res) => {

    const body = req.body;
    const id = req.params.id;

    try {

        const userDb = await Users.findByIdAndUpdate(id, body, { useFindAndModify: false });

        res.json({
            ok: true,
            messagge: 'editado',
        })

    } catch (error) {

        res.status(500).json({

            ok: false,
            error
        })

    }
})


module.exports = router;