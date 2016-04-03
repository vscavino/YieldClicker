/**
 * Created by s14000079 on 17/03/16.
 */


$( document ).ready(function() {
    console.log( "ready!" );
    var score = 1;

    $('form').submit (function () {
        console.log ("submit");
        return false;
    });

    $ ('#inscription').click (function () {
        console.log ("inscription");
        $ ('#forminscription').show();
        $ ('#formsauvegarde').hide ();
        $ ('#formreprendre').hide();
    });

    $ ('#sauvegarder').click (function () {
        console.log ("sauvegarder");
        $ ('#formsauvegarde').show();
        $ ('#forminscription').hide ();
        $ ('#formreprendre').hide();
    });

    $ ('#reprendre').click (function () {
        console.log ("reprendre");
        $ ('#formreprendre').show();
        $ ('#forminscription').hide();
        $ ('#formsauvegarde').hide ();
    });

    $ ('#inscrire').click (function () {
        var pseudo = $ ('#pseudoinscription').val();
        var mdp    = $ ('#mdpinscription').val()   ;
        var cmdp   = $ ('#cmdp').val()             ;


        if (mdp != cmdp) {
            $ ('#erreur').text("Mauvais mot de passe");
        }
        else {
            $ ('#erreur').text("");
            console.log(pseudo);
            console.log(mdp);
            console.log(score);
            $.ajax({
                method: 'post',
                url: "inscription.php",
                data: {
                    pseudo: pseudo,
                    mdp: mdp,
                    score: score
                },
                datatype: "json"
            });
        }
    });

});







