const { response } = require("express");

const isAdminRole = (req, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: 'Valid token it must be first than valid rol'
        });
    }

    const { role, username } = req.user;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${username} is not admin`
        })
    }
    next();
}


module.exports = {
    isAdminRole
}