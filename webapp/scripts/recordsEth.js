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
var dbAbi = [{"constant":false,"inputs":[{"name":"addr","type":"address"},{"name":"category","type":"string"}],"name":"grantEdit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"},{"name":"category","type":"string"}],"name":"revokeEdit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"datOwner","type":"address"},{"name":"viewer","type":"address"}],"name":"canView","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"grantView","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"datOwner","type":"address"},{"name":"editor","type":"address"},{"name":"category","type":"string"}],"name":"canEdit","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"},{"name":"category","type":"string"},{"name":"blob","type":"string"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"revokeView","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"},{"name":"category","type":"string"}],"name":"get","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

const dbAddr = "0x182aebf22024e26a926f67c15fc07ffdddd59601"
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
    console.log(addr, category, obj)
    dbContract.set.sendTransaction(addr, category, obj);
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

//window.onload = function() {
    var bioData, transcriptData, testData;
    bioRaw = getObj(selfAddr, CAT_BIO);
    if (bioRaw != null && bioRaw != "") {
        bioData = JSON.parse(bioRaw);
    }
    transcriptRaw = getObj(selfAddr, CAT_TRANSCRIPT);
    if (transcriptRaw != null && transcriptRaw != "") {
        transcriptData = JSON.parse(transcriptRaw);
    }
    testRaw = getObj(selfAddr, CAT_TESTS);
    if (testRaw != null && testRaw != "") {
        testData = JSON.parse(testRaw);
    }


    var transcriptBody = document.querySelector("#transcript-text");
    var testBody = document.querySelector("#tests-text");

    if (transcriptData != null) {
        transcriptBody.text = JSON.stringify(transcriptData, null, 4);
    }
    if (testData != null) {
        testBody.text = JSON.stringify(testData, null, 4);
    }

    if (bioData != null) {
        document.querySelector("#bio-first-name").value = (bioData.firstName != null) ? bioData.firstName : '';
        document.querySelector("#bio-middle-name").value = (bioData.middleName != null) ? bioData.middleName : '';
        document.querySelector("#bio-last-name").value = (bioData.lastName != null) ? bioData.lastName : '';
        document.querySelector("#bio-dob").value = (bioData.dob != null) ? bioData.dob : '';
        document.querySelector("#bio-languages").value = (bioData.languages != null) ? bioData.languages : '';
        document.querySelector("#bio-nationality").value = (bioData.nationality != null) ? bioData.nationality : '';
    }


    document.querySelector("#update-bio").addEventListener('click', function(){
        var data = {};
        data.firstName = document.querySelector("#bio-first-name").value;
        data.middleName = document.querySelector("#bio-middle-name").value;
        data.lastName = document.querySelector("#bio-last-name").value;
        data.dob = document.querySelector("#bio-dob").value;
        data.languages = document.querySelector("#bio-languages").value;
        data.nationality = document.querySelector("#bio-nationality").value;
        setObj(selfAddr, CAT_BIO, JSON.stringify(data));
    });
//}
