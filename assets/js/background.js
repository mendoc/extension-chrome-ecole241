chrome.runtime.onInstalled.addListener(function() {

    // Gestion des notifications
    var opt = {
        type: "basic",
        title: "Primary Title",
        message: "Primary message to display",
        iconUrl: "../img/icone-48x48.png"
    };

    // Sauvegarde du paramètre couleur
    chrome.storage.sync.set({color: '#3aa757'}, function() {
        console.log("The color is green.");
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