let movieschema = require('../models/movie');

let request = require('request');

module.exports = {

    /*this function is called in route to search the movie data from tmdb api*/
    search: function(req, res) {

        request.get('https://api.themoviedb.org/3/search/movie?api_key=360fb236234213ff65f11eac623fb645&language=en-US&query=' + req.query.moviename + '&page=1&include_adult=false', function(err, response, body) {
            res.status(200).json(response.body);
        });
    },
    /*this will add the movie into db when add to favourite button is clicked*/
    favourite: function(req, res) {

        var a = JSON.parse(req.body.field1);
        var newfav = {
            title: a.title,
            poster: a.poster,
            release_date: a.release_date,
            email: req.body.email
        };
        movieschema.findOne({
            title: a.title,
            email: req.body.email
        }, function(err, data) {
            if (data == null) {
                var db = new movieschema(newfav);
                db.save().then((doc) => {
                    res.status(200).redirect('/');
                }, (err) => {
                    res.send(err);
                });
            } else {
                res.status(200).redirect('/index.html');
            }
        });
    },

    /*this get all the data from the favourite db*/
    viewfavourite: function(req, res) {

        movieschema.find({
            'email': req.query.email
        }, function(err, data) {
            if (err)
                throw err;
            else {
                res.status(200).send(data);
            }
        });
    },

    /*delete the movie from the favourite db*/
    delfavourite: function(req, res) {

        var title = req.query.title;
        movieschema.remove({
            title: title,
            email: req.query.email
        }, function(err, data) {
            if (err)
                throw err;
            else {
                res.status(200).send("success");
            }
        });
    }
};