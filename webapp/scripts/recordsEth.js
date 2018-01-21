/**
 * ethConnect connects to the geth rpc connection.
 * @returns Web3 object with Etherium API
 */
function ethConnect() {
    if (typeof web3 !== 'undefined') {
        return new Web3(web3.currentProvider);
    } else {
        return new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
}

// Connect to geth API
web3 = ethConnect();

// Constants
var dbAbi = [{"constant":false,"inputs":[{"name":"addr","type":"address"},{"name":"category","type":"string"}],"name":"grantEdit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"canView","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"},{"name":"category","type":"string"}],"name":"revokeEdit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"grantView","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"},{"name":"category","type":"string"}],"name":"canEdit","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"},{"name":"category","type":"string"},{"name":"blob","type":"string"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"revokeView","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"},{"name":"category","type":"string"}],"name":"get","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

const dbAddr = "0x2d5d5fef492d2d7d0e24b18f454f3b53d7520a45"
const selfAddr = web3.eth.coinbase;

const CAT_BIO = "bio";
const CAT_TESTS = "tests";
const CAT_TRANSCRIPT = "transcript";

// Ensure default account is set
if (web3.eth.defaultAccount != selfAddr) {
    web3.eth.defaultAccount = selfAddr;
}

// Get database contract
const dbDef = web3.eth.contract(dbAbi);
const dbContract = dbDef.at(dbAddr)

/**
 * setObj updates a piece of information using the database contract
 * @param addr String Address of data owner
 * @param category String Name of type of data
 * @param obj Object data to store
 */
function setObj(addr, category, obj) {
    dbContract.set(addr, category, obj);
}

/**
 * getObj retrieves a piece of information using the database contract
 * @param addr String Address of the data owner
 * @param category String Name of type of data
 * @returns Object Data
 */
function getObj(addr, category) {
    return dbContract.get.call(addr, category);
}

window.onload = function() {
    var bioData = JSON.parse(getObj(selfAddr, CAT_BIO));
    var transcriptData = JSON.parse(getObj(selfAddr, CAT_TRANSCRIPT));
    var testData = JSON.parse(getObj(selfAddr, CAT_TESTS));

    var transcriptBody = document.querySelector("#transcript-text");
    var testBody = document.querySelector("#tests-text");

    transcriptBody.text = JSON.stringify(transcriptData, null, 4);
    testBody.text = JSON.stringify(testData, null, 4);
}
