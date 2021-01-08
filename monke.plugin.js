//META{"name":"monke"}*//
function monke() {
    return;
}

monke.prototype.load = function() {};

monke.prototype.unload = function() {};

monke.prototype.load = function(){
    if(typeof DiscordInternals == "undefined") {
        BdApi.showConfirmationModal("do you rlly want to become monke", "if yes you must install a required library by clicking the button below", {
            confirmText: "yes i want to become monke",
            cancelText: "no i will stay human for now sry",
            onCancel: _ => {BdApi.showToast("what a mess u will stay human until you reload the plugin")},
            onConfirm: _ => {
                require('request').get("https://raw.githubusercontent.com/samogot/betterdiscord-plugins/master/v1/1lib_discord_internals.plugin.js", (e, r, b) => {
                    if (!e && b && b.indexOf(`return LibPlugin`) > -1) require('fs').writeFile(require("path").join(BdApi.Plugins.folder, "discordinternal.plugin.js"), b, _ => {BdApi.showToast("omg you are now a monke")});
                    else BdApi.alert("err", "an error occured and you cannot become monke for now please try again later")
                })
            }
        })
    }
}

monke.prototype.start = function() {
    this.load()
    this.attachHandler();
};

monke.prototype.onSwitch = function() {
    this.attachHandler();
};

monke.prototype.stop = function() {
    var el = $('.da-form');
    if (el.length == 0) return;

    // Remove handlers and injected script
    el[0].removeEventListener("keydown", this.handleKeypress);
};

monke.prototype.getName = function() {
    return "monke";
};

monke.prototype.getDescription = function() {
    return "go back i want to be monke";
};

monke.prototype.getVersion = function() {
    return "mon.ke";
};

monke.prototype.getAuthor = function() {
    return "ooo oAOOH ";
};

let sendMessage = function(message) {
    // Get the ID of the channel we want ot send the embed to
    var channelID = window.location.pathname.split('/').pop();

    // Create the message
    let MessageQueue = DiscordInternals.WebpackModules.findByUniqueProperties(['enqueue']);
    let MessageParser = DiscordInternals.WebpackModules.findByUniqueProperties(["createBotMessage"]);

    let msg = MessageParser.createBotMessage(channelID, "");

    // Send the message
    MessageQueue.enqueue({
        type: 0,
        message: {
            channelId: channelID,
            content: message,
            tts: false,
            nonce: msg.id,
        }
    }, r => {
        return;
    });
}

// Get the deepest child of a parent
let getDeepest = function(elem) {
    if(elem.firstChild == null) {
        return elem;
    } else {
        return getDeepest(elem.firstChild)
    }
}

// Split a string on only the first delimeter
let splitSingle = function(str, delimeter) {
    part1 = str.substr(0, str.indexOf(delimeter));
    part2 = str.substr(str.indexOf(delimeter) + 1);

    return [part1, part2]
}

const texts = [
    "oho",
    "hooaoho",
    "aohooo",
    "ohhhaghoaoh",
    "aogoooo",
    "haog",
    "oAo",
    "hAAH",
]

let lastKey = 0;
monke.prototype.attachHandler = function() {
    var el = $('form[class^="form-"]');
    if (el.length == 0) return;

    // Handler to catch key events
    this.handleKeypress = function(e) {
        var code = e.keyCode || e.which;

        if (code !== 13) {
            //console.log(`Ignored keypress: ${code}`);
            lastKey = code;
            return;
        }

        //Catch Shift + Enter and allow multiline
        if (lastKey == 16) {
            return;
        }

        // Parse the text
        var elements = Array.from($('div[class^="textArea-"]')[0].children[0].children);
        var text = "";
        elements.forEach(function(l0) {
            Array.from(l0.children).forEach(function(l1) {
                Array.from(l1.children).forEach(function(elem) {
                    console.log(elem);
                    elem = getDeepest(elem);
                    if(elem.alt) {
                        text += elem.alt;
                    } else {
                        text += elem.textContent;
                    }
                });
            });
            text += "\n";
        });
        if (!text.startsWith("/monke")) {
            //console.log(`Ignored text entry: ${text}`);
            return;
        }
        elements.forEach(function(l0) {
            Array.from(l0.children).forEach(function(l1) {
                Array.from(l1.children).forEach(function(elem) {
                    console.log(elem);
                    elem = getDeepest(elem);
                    if(elem.alt) {
                        elem.alt="";
                    } else {
                        elem.textContent="";
                    }
                });
            });
            text += "\n";
        });
        e.preventDefault();
        e.stopPropagation();

        const number = Math.floor(Math.random() * 10);
        let textt="";
        for(let i=0;i<number;i++){
            textt+=texts[Math.floor(Math.random() * 7)]+" "
        }

        sendMessage(textt);

    }

    // bind handlers
    el[0].addEventListener("keydown", this.handleKeypress, false);
}
