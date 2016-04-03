

$(document).ready (function () {

    console.log ("Clicker");
    $ ('#missile').hide ();
    $ ('#antoine').hide ();
    $ ('#notenough').hide ();
    $ ('#divErreur').hide ()

    var score = 0;
    var change = 0;

    var nbreAntoine = 0;
    var prixA = 5;

    var nbreIroquois= 0;
    var prixI = 50;

    function augmenterScore (nombre) {
        score += nombre;
        $('#score').html ("Point : " + score);
    }

    function scoreParTour () {
        score += nbreIroquois;
        $('#score').html ("Point : " + score);
    }

    function payer (prix) {
        if (score >= prix) {
            score -= prix;
            $("#score").html ("Point : " + score);
            $('#notenough').hide();
            return 1;
        }
        else {
            $('#notenough').show();
            return 0;
        }
    }

    //CLIQUER SUR L'IMAGE

    $ (".clickable").click (function () {
        console.log ("Score : " + score);
        augmenterScore (1+nbreAntoine);
        if (change == 0) {
            $("#hello").hide ();
            $("#missile").show();
            change = 1;
        }
        else {
            $("#missile").hide ();
            $("#hello").show();
                change = 0;
        }
    })

    //TRAITEMENT ANTOINE

    $("#acheterAntoine").click(function () {
        if (payer (prixA)) {
            nbreAntoine++;
            prixA *=2;
            $('#antoines').append("<img class='bonus' src='img/antoine.jpg'/>");
            $('#prixAntoine').html("Antoine's price : " + prixA);
            console.log ("nbreAntoine : " + nbreAntoine);
        };
    })

    //TRAITEMENT IROQUOIS

    $("#acheterIroquois").click(function (){
        if (payer (prixI)) {
            nbreIroquois++;
            prixI = Math.floor(prixI *= 1.5);
            $('#iroquois').append("<img class='bonus' src='img/iroquois.jpg'/>");
            $('#prixIroquois').html("Iroquois's price : " + prixI);
            console.log ("nbreIroquois : "  + nbreIroquois);
        }
    })

    //POINT PAR SECONDE

    setInterval(scoreParTour,500);


    //GESTION CONNEXION

    $("#connexion").click(function() {
        var pseudo = $('#pseudo').val();
        var mdp    = $('#mdp').val();
        $.ajax({
            method:"post",
            url: "connexion",
            data: {
                pseudo: pseudo,
                mdp: mdp,
                antoines: nbreAntoine,
                iroquois: nbreIroquois
            }
        }).done (function (data) {
            console.log (data.success);
            if (data.success === false) {
                $('#divErreur').show();
            }
            else {
                nbreAntoine  = data.results.antoines;
                prixA        = 5 * Math.pow(2, nbreAntoine);
                $('#prixAntoine').html("Antoine's price : " + prixA);
                nbreIroquois = data.results.iroquois;
                prixI        = 50 * Math.pow(1.5, nbreIroquois);
                $('#prixIroquois').html("Iroquois's price : " + prixI);
                console.log (nbreAntoine, nbreIroquois);
                var index = 0;
                while (index < nbreIroquois) {
                    $('#iroquois').append("<img class='bonus' src='img/iroquois.jpg'/>");
                    index++;
                }
                index = 0;
                while  (index < nbreAntoine) {
                    $('#antoines').append("<img class='bonus' src='img/antoine.jpg'/>");
                    index++;
                }
                $('#divErreur').hide();
            }
        });
    });

    //GESTION INSCRIPTION

    $("#inscr").click(function () {
        var pseudo = $('#pseudo').val();
        var mdp    = $('#mdp').val();
        $.ajax({
            method: "post",
            url: "inscr",
            data: {
                pseudo: pseudo,
                mdp: mdp,
                antoines: nbreAntoine,
                iroquois: nbreIroquois
            }
        }).done (function () {
            console.log("Inscription réussie");
        });
    });

    $("#form-login").submit(function() {
        return false;
    });
})