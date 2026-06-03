const express = require("express")
const fs = require("fs-extra")

const router = express.Router()

const db = "./database/memory.json"

if (!fs.existsSync(db)) {
    fs.writeJsonSync(db, {})
}

router.get("/save", async (req, res) => {

    const user = req.query.user
    const key = req.query.key
    const value = req.query.value

    if (!user || !key || !value) {
        return res.json({
            status: false,
            msg: "Use user, key e value"
        })
    }

    const data = await fs.readJson(db)

    if (!data[user]) {
        data[user] = {}
    }

    data[user][key] = value

    await fs.writeJson(db, data)

    res.json({
        status: true,
        result: data[user]
    })

})

router.get("/get", async (req, res) => {

    const user = req.query.user
    const key = req.query.key

    const data = await fs.readJson(db)

    if (!data[user]) {
        return res.json({
            status: false,
            msg: "Usuário não encontrado"
        })
    }

    res.json({
        status: true,
        result: data[user][key]
    })

})

module.exports = router
