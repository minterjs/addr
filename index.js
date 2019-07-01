const {generateWallet} = require('minterjs-wallet');

const Db = require('tingodb')().Db,
    assert = require('assert');

const db = new Db(`${__dirname}/db`, {});
// Fetch a collection to insert document into
const collection = db.collection("mx");

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const record = async (collection, data) => new Promise((resolve, reject) => {
    try {
        db.collection(collection).insert(data, (e, r) => {
            resolve(e, r);
            if (e) {
                console.log('ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ')
            }
        });
    } catch (e) {
        reject(e);
    }

});

getSeven = async () => {
    // const collection = db.collection("addresses");
    let attempts = 0;
    let c7 = 0;
    let c666 = 0;
    let wallet = {};
    let w = {};
    let inserted = 0;
    let ww = [];
    let isMx = false;
    let isMx00 = false;
    let isMx000 = false;
    let isMx2310 = false;
    let isMx2806 = false;
    let isMx0707 = false;
    let col = '';
    while (1 == 1) {
        wallet = generateWallet();
        let address = wallet.getAddressString();
        attempts++;
        // c7_max = (c7_max < c7) && c7 || c7_max;
        // console.log(address, inserted);
        c7 = address.split("7").length - 1;
        c666 = address.split("666").length - 1;
        isMx = (address.split('Mx007').length - 1 > 0);
        isMx00 = (address.split('Mx00').length - 1 > 0);
        isMx000 = (address.split('Mx000').length - 1 > 0);
        isMx2310 = (address.split('Mx2310').length - 1 > 0);
        isMx0707 = (address.split('Mx0707').length - 1 > 0);
        isMx2806 = (address.split('Mx2806').length - 1 > 0);
        const pretty = (isMx && c7 > 5) || isMx000 || isMx2310 || isMx2806 || isMx0707 || (c7 > 10) || c666 > 1;
        if ((c7 > 6) || isMx00 || pretty || c666 > 1) {
            let mnemonic = wallet.getMnemonic();
            let privateKey = wallet.getPrivateKeyString();
            let publicKey = wallet.getPublicKeyString();

            w = {address, mnemonic, privateKey, publicKey};
            // console.log({c7, c7_max, w});
            inserted++;
            // console.log(collection);
            ww.push(w);
            console.log(inserted, w);
            col = isMx && 'Mx007_' + c7 || isMx000 && ('Mx000' + address[5]) || isMx00 && ('Mx00' + address[4]) || isMx2310 && ('Mx2310') || isMx2806 && ('Mx2806') || isMx0707 && ('Mx0707') || ('c7_' + c7);
            await record(col, w).catch(e => console.log(e.message));
            if (pretty) {
                await record('pretty', w).catch(e => console.log(e.message));
            }

        }
    }
    return w;
}


app.get('/list', function (req, res) {
    db.collection('pretty').find({}).toArray((err, result) => {
        if (result) {
            console.log(result);
            res.json(result);
        } else {
            res.json({error: 'not found'});
        }
    });
});

app.listen(3001, function () {
    console.log('listening on port 3001!');
});

getSeven();

