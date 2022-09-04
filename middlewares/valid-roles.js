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

const hasRole = (...roles) => {
    return (req, res = response, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'Valid token it must be first than valid rol'
            });
        }

        const { role, username } = req.user;

        if (!roles.includes(role)) {
            console.warn(`${username} does not have the role: ${role}`);
            return res.status(401).json({
                msg: `${username} does not have permissions.`
            })
        }
        next();
    }
    
}


module.exports = {
    isAdminRole,
    hasRole
}