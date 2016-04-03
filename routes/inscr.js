/**
 * Created by s14000079 on 01/04/16.
 */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//Schema de la BD

var modeles = require ('./modeles.js');

//Inscription

router.use('/', function(req, res, next) {
    console.log(req.body);

    var user = new modeles.User({
        pseudo: req.body.pseudo,
        mdp: req.body.mdp,
        antoines: req.body.antoines,
        iroquois: req.body.iroquois
    });

    user.save(function(err) {
        if (err) {
            console.log(err);
            res.json({
                success: false
            });
        }
        else {
            console.log("réussi");
            res.json({
                success: true
            });
        }
    });
});

module.exports = router;
