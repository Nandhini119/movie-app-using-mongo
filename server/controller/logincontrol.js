let loginschema = require('../models/signup');

let loginControl = {

    logout: function(req, res) {

        req.session.destroy(function(err) {

            if (err) {

                console.log("Error");

            } else

            {

                res.send("success");

            }

        });

    }
};
module.exports = loginControl;