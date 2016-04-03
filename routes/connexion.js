/**
 * Created by s14000079 on 01/04/16.
 */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//Schéma de la BD


var modeles = require ('./modeles.js');

//Connexion

router.use ('/', function (req, res, next) {
    modeles.User.findOne({ pseudo: req.body.pseudo })
        .exec (function (err, results) {
            if (err) {throw err;}

            if (results === null) {
                console.log ("Mauvais pseudo");
                res.json({
                    success: false
                });
                return;
            };
            console.log (req.body.mdp, results.mdp);

            if (req.body.mdp == results.mdp) {
                console.log ("Bon MDP");
                res.json ({
                    success: true,
                    results: results
                });
                console.log(results);
            }
            else {
                console.log ("Mauvais MDP");
                res.json({
                    success: false
                });
            }
        });
})

module.exports = router;