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
console.log(file)

//////
// index.js create user pass
//////
if (command == "create"){
    if (!fs.existsSync(file)) {
        randomWallet.encrypt(pass).then((wallet) => {
            console.log(wallet)
            fs.writeFile(file, wallet, function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });
        })
    }else{
        console.log("Account already exits")
    }
//////
// index.js send user pass to_address ammount
//////
}else if (command == "send") {
    ethers.Wallet.fromEncryptedJson(fs.readFileSync(file, 'utf8'), pass).then(function(wallet) {
        console.log("Address: " + wallet.address);
        console.log(directoryPath + to_user)

        if (fs.existsSync(directoryPath + to_user)) {
            let rawdata = fs.readFileSync(directoryPath + to_user);
            let address_to = JSON.parse(rawdata);
            console.log(address_to.address);
            var connected_wallet = wallet.connect(infuraProvider)
            let tx = {
                to: '0x'+address_to.address,
                value: ammount * 10e9
            };
            let sendPromise = connected_wallet.sendTransaction(tx);
            sendPromise.then((tx) => {
                console.log(tx);
                fs.writeFile("/tmp/tx.log", JSON.stringify(tx), function(err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("The file was saved!");
                });
            }).catch(console.log);
        } 
    });
}
