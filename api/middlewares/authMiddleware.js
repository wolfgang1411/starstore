const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req,res,next){
    const token = req.header('x-auth-token')

    if(!token) {
        return res.status(400).json({errors:'No Token , Access Denied'})
    }

    try {
        const decode = jwt.verify(token,config.get('jwtSecret'))
        req.user = decode

    } catch (err) {
        console.log(err.message)
        return res.status(400).json({errors:'Invalid Token'})
    }
    
    next()
}