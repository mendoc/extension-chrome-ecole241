$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAP4uqoxAgOPfMdE-jmk4cwvzm_XnN-yIM",
        authDomain: "notifier-21b1a.firebaseapp.com",
        databaseURL: "https://notifier-21b1a.firebaseio.com",
        projectId: "notifier-21b1a",
        storageBucket: "notifier-21b1a.appspot.com",
        messagingSenderId: "688946935250"
    };
    firebase.initializeApp(config);

    // Get a reference to the database service
    var pub_ref = firebase.database().ref('/ecole241/publication');

    pub_ref.on('value', function(snapshot) {
        let data = snapshot.val();
        $('#pub_titre').val(data.titre);
        $('#pub_contenu').text(data.contenu);
        $('#pub_form fieldset').removeAttr('disabled');
        toggleLoad(false)
    });

    /* événements */

    $('#pub_form').submit(function (e) {
        e.preventDefault();

        let fielset = $('#pub_form fieldset');
        fielset.attr('disabled', 'true');

        let pub = {
            titre: $('#pub_titre').val(),
            contenu: $('#pub_contenu').val()
        };

        firebase.database().ref('/ecole241/publication').set(pub, function(error) {
            if (error) {
                $('.error-msg').show();
            } else {
                fielset.removeAttr('disabled');
            }
        });
    });

    /* fonctions */

    function toggleLoad(state) {
        if (state) $('.load').show()
        else $('.load').hide()
    }
});