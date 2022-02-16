const bcrypt = require("bcryptjs");

exports.hashPass = async ( req, res, next) => {
    try {
        req.body.pass = await bcrypt.hash(req.body.pass, 8);
        next();
    } catch (error) {
        console.log(error)
        res.status(500).send({err: error.message});
    }
}