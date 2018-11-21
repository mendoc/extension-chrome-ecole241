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
    var ref = firebase.database().ref('/ecole241');

    ref.on('value', function(snapshot) {
        let data = snapshot.val().publication;
        $('#publication .titre').text(data.titre);
        $('#publication .contenu').html(data.contenu);
        $('#publication').show();
        toggleLoad(false)
    });

    /* fonctions */

    function toggleLoad(state) {
        if (state) $('.load').show()
        else $('.load').hide()
    }
});