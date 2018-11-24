chrome.runtime.onInstalled.addListener(function() {

    function getNotificationId() {
        let id = Math.floor(Math.random() * 9007199254740992) + 1;
        return id.toString();
    }

    function messageReceived(titre, message) {

        // Pop up a notification to show the GCM message.
        chrome.notifications.create(getNotificationId(), {
            title: titre,
            iconUrl: 'assets/img/icone-48x48.png',
            type: 'basic',
            message: message
        }, function() {});
    }

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
    var ref = firebase.database().ref('/ecole241/publication');

    ref.on('value', function(snapshot) {
        let data = snapshot.val();
        messageReceived("Ecole 241 - Nouvelle publication", data.titre)
    });

    chrome.contextMenus.removeAll();
    chrome.contextMenus.create({
        title: "Déconnexion",
        contexts: ["page_action"],
        id: "logout",
        onclick: function() {
            chrome.storage.sync.clear(function () {
                console.log("Déconnexion...")
            });
        }
    });

    // Définition de quand l'extension devra être active
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostContains: '.'},
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});