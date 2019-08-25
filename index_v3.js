#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ethers = require('ethers');

let randomWallet = ethers.Wallet.createRandom();

let infuraProvider = new ethers.providers.InfuraProvider('rinkeby', "918963fae0a24ff4beafa5f080d659df");

var args = process.argv.slice(2);

console.log(args)
const directoryPath = path.join(__dirname, 'wallets/');

const command = args[0]
const user = args[1]
const pass = args[2]
const to_user = args[3]
const ammount = args[4]

const file = directoryPath + user

fs.writeFile("/tmp/dump.txt"), args, function(err) {
    console.log("done")
}

//////
// index.js create user pass
//////
if (command == "create") {
    if (!fs.existsSync(file)) {
        randomWallet.encrypt(pass).then((wallet) => {
            console.log(wallet)
            fs.writeFile(file, wallet, function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
                // destination.txt will be created or overwritten by default.
                fs.copyFile(file, '/tmp/dump.txt', (err) => {
                    if (err) throw err;
                    console.log('source.txt was copied to destination.txt');
                });
            });
        })
    } else {
        console.log("Account already exits")
    }
    //////
    // index.js send user pass to_address ammount
    //////
} else if (command == "send") {
    ethers.Wallet.fromEncryptedJson(fs.readFileSync(file, 'utf8'), pass).then(function(wallet) {
        console.log("Address: " + wallet.address);
        console.log(directoryPath + to_user)

        if (fs.existsSync(directoryPath + to_user)) {
            let rawdata = fs.readFileSync(directoryPath + to_user);
            let address_to = JSON.parse(rawdata);
            console.log(address_to.address);
            var connected_wallet = wallet.connect(infuraProvider)
            let tx = {
                to: '0x' + address_to.address,
                value: ammount * 10e9
            };
            let sendPromise = connected_wallet.sendTransaction(tx);
            sendPromise.then((tx) => {
                console.log(tx);
            }).catch(console.log);
        }
    });
    //////
    // index.js call user pass
    //////
} else if (command == "call") {
    fs.readdirSync(directoryPath).forEach(file => {
        console.log(file)
        var file_call = '/var/spool/asterisk/outgoing/' + pass + '.call'
        if (file.endsWith("_"+user)) {
            console.log(file)
            dial = file.replace('_' + user, '');
            console.log(user)
            msg = "Channel: SIP/" + dial + "\nCallerid:666\nMaxRetries: 5\nRetryTime: 300\nWaitTime: 45\nContext: outboundmsg1\nExtension: s\nPriority: 1\n";
            console.log(msg)
            fs.writeFile(file_call, msg, function(err) {
                if (err) {
                    return console.log(err);
                }

                //uid=111(asterisk) gid=115(asterisk) groups=115(asterisk),20(dialout),29(audio)

                fs.chown(file_call, 111, 115, console.log);

                fs.chmod(file_call, 0777, (error) => {
                    console.log('Changed file permissions');
                });

                console.log("The file was saved!");
            });
        }
    });
}
