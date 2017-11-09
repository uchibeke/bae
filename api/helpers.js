exports.helpers = {
    getValues: function (myJson) {
        for (var keyIn in myJson) {
            if (myJson.hasOwnProperty(keyIn + "")) {
                // Check if its an an array then just assign value
                if (Object.prototype.toString.call(myJson[keyIn + ""]) === undefined) {
                    // return JSON.stringify({"END": "IS IS FINISHED"});
                } else {
                    // Call the function recursively
                    if (
                        (keyIn + "").toLowerCase().includes("route") || (keyIn + "").toLowerCase().includes("twilio") || (keyIn + "").toLowerCase().includes("data") || (keyIn + "").toLowerCase().includes("payload")) {
                        return "\n\n" + keyIn + ":\n" + JSON.stringify(myJson[keyIn + ""]) + "\n\n" + getValues(myJson[keyIn + ""]);
                    }
                }
            }
        }
    },
    // {
    //     "$class":"org.acme.bae.Give",
    //     "receiver":"Uchi",
    //     "receiverContact":"3067155488",
    //     "description":"desc",
    //     "owner":"2"
    //  }
    jsonFromSMS: function (body) {
        var sms = body.Body;
        var sender = body.From;

        var textParts = sms.trim().split(/\s+/);
        var input = {};
        var msg;

        // TEXT FORMAT
        // TO GIVE ACCESS: give assetID to userName with contact <Number/Email>
        // TO CANCEL ACCESS: take assetID from userName with contact  <Number/Email>
        // TO CHECK IF HAVE ACCESS: does userName with contact  <Number/Email> have assetID
        switch (textParts[0].toLowerCase()) {
            case "give":
                input = {
                    action: "give",
                    contact: sender,
                    owner: sender,
                    createdOn: this.currentTime(),
                    receiver: textParts[3],
                    receiverContact: textParts[6],
                    lastDevice: body.FromCity + " " + body.FromState + " " + body.FromCountry,
                    description: textParts[1]
                };
                break;
            case "take":
                input = {
                    action: "take",
                    contact: sender,
                    owner: sender,
                    createdOn: this.currentTime(),
                    receiver: textParts[3],
                    receiverContact: textParts[6],
                    lastDevice: "Iphone",
                    description: textParts[1]
                };
                break;
            case "does":
                input = {
                    action: "ask",
                    contact: sender,
                    owner: sender,
                    createdOn: this.currentTime(),
                    receiver: textParts[1],
                    receiverContact: textParts[4],
                    lastDevice: "Iphone",
                    description: textParts[6]
                };
        }
        return {
            input: input,
            msg: msg
        };
    },
    currentTime: function () {
        var today = new Date();
        return today.setDate(today.getDate() + 0);
    },
    S4: function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },
    guid: function () {
        var num = (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0, 3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase() + "";
        return num;
    },
    isJson: function (str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

};

