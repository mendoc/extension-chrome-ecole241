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

        messageReceived("Nouvelle publication")
    });

    /* fonctions */

    function toggleLoad(state) {
        if (state) $('.load').show()
        else $('.load').hide()
    }

    function getNotificationId() {
        var id = Math.floor(Math.random() * 9007199254740992) + 1;
        return id.toString();
    }

    function messageReceived(message) {
        console.log("Message received: " + message);

        // Pop up a notification to show the GCM message.
        chrome.notifications.create(getNotificationId(), {
            title: 'Ecole 241',
            iconUrl: '../img/icone-48x48.png',
            type: 'basic',
            message: message
        }, function() {});
    }
});