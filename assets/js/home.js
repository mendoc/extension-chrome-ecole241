$(document).ready(function () {

    //toggleLoad(true);

    //removeToken();

    getToken();

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
    let db = firebase.database();

    /* événements */

    $('.nav-item').click(function () {
        let tab = $(this).find('.nav-link').attr("href").replace("#", "");
        switch (tab) {
            case 'tab_chat':
                break;
        }
    });

    $('#input_msg').keyup(function (e) {
        if (e.keyCode === 13) {
            let self = true;
            let msg = $(this).val();
            if (msg.indexOf("#") !== -1) self = false;
            msg = msg.replace("#", "");
            writeNewMsg(msg, self);
        }
    });

    $('#btn_jeton').click(function () {
        let msg_error = $('#bloc_login p');
        msg_error.hide();
        let jeton = $('#input_jeton').val();
        if (jeton === '') {
            msg_error.text("Veuillez renseigner votre jeton d'identification.");
            msg_error.show();
            return;
        }
        checkToken(jeton);
    });

    /* fonctions */

    function toggleLoad(tab, state) {
        let sel = '#' + tab + ' .load';
        if (state) $(sel).show();
        else $(sel).hide();
    }

    function loadDiscussion(database) {
        getUser(function (data) {
            console.log("user : ", data);
            let ref = database.ref('/ecole241/discussion/' + data.user);
            ref.on('value', function(snapshot) {
                $('.messages').empty();
                snapshot.forEach(function(childSnapshot) {
                    var childData  = childSnapshot.val();
                    if (childData.self){
                        $('.messages').append('<div dir="rtl" class="msg-parent"><div dir="ltr" class="alert text-danger msg msg-out" role="alert">'+childData.message+'</div></div>');
                    } else {
                        $('.messages').append('<div class="alert alert-danger msg msg-in" role="alert">'+childData.message+'</div>');
                    }
                });
                toggleLoad('tab_chat', false);
                $('#discussion').show();
            });
        });
    }

    function loadPublication(database) {
        var ref = database.ref('/ecole241/publication');
        ref.on('value', function(snapshot) {
            let data = snapshot.val();
            $('#publication .titre').text(data.titre);
            $('#publication .contenu').html(data.contenu);
            $('#publication').show();
            toggleLoad('tab_pub', false)
        });
    }

    function writeNewMsg(texte, self) {
        getUser(function (data) {
            let branch = '/ecole241/discussion/' + data.user + '/' ;
            let msg = {
                message: texte,
                self: (self) ? true : null
            };

            var newMsgKey = db.ref().child(branch).push().key;

            firebase.database().ref(branch + newMsgKey).set(msg, function(error) {
                if (error) {
                    //$('.error-msg').show();
                    console.log("Erreur lors de l'envoi du message")
                } else {
                    console.log("Message envoyé");
                    $('#input_msg').val("");
                }
            });
        });

    }

    function saveToken(token) {
        // Sauvegarde du jeton d'identification
        chrome.storage.sync.set({jeton: token}, function() {
            console.log("Jeton sauvegardé");
        });
    }

    function saveUser(username) {
        // Sauvegarde du jeton d'identification
        chrome.storage.sync.set({user: username}, function() {
            console.log("Utilisateur sauvegardé");
        });
    }

    function removeToken() {
        // Suppression du jeton d'identification
        chrome.storage.sync.remove("jeton", function() {
            console.log("Jeton supprimé");
        });
    }

    function checkToken(jeton) {
        // Vérifier du jeton d'identification
        let msg_error = $('#bloc_login p');
        if (jeton === '') {
            msg_error.text("Jeton d'identification non renseigné.");
            msg_error.show();
            return;
        }
        var existe = false;
        var username = "";
        let data = firebase.database().ref('/ecole241/user').once('value');
        data.then(function (b) {
            console.log("Dans la fonction", b);
            b.forEach(function(childSnapshot) {
                let infos = childSnapshot.val();
                if (jeton == infos.jeton){
                    $('#bloc_login').hide();
                    $('#bloc_main').show();
                    saveUser(childSnapshot.key);
                    saveToken(infos.jeton);
                    init(firebase.database());
                    //existe = true;
                    //username = childSnapshot.key;
                    //return;
                }
            });
            msg_error.text("Ce jeton est incorrect.");
            msg_error.show();
        });
    }

    function getToken() {
        // Récupération du jeton d'identification
        chrome.storage.sync.get("jeton", function (data) {
            let jeton = data.jeton;
            if (jeton) {
                $("#bloc_main").show()
                init(firebase.database());
            } else {
                $("#bloc_login").show()
            }
            $('#input_jeton').val(jeton);
        });
    }

    function getUser(callback) {
        // Récupération du nom d'utilisateur
        chrome.storage.sync.get("user", callback);
    }

    function init(db) {
        /* Chargement des contenus */
        loadPublication(db);
        loadDiscussion(db);
    }
});