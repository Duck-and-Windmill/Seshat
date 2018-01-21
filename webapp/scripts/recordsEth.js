/**
 * ethConnect connects to the geth rpc connection.
 * @returns Web3 object with Etherium API
 */
function ethConnect() {
    //if (typeof web3 !== 'undefined') {
    //   return new Web3(web3.currentProvider);
    //} else {
        return new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    //}
}

// Connect to geth API
web3 = ethConnect();

// Constants
var dbAbi = [{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"},{"name":"blob","type":"string"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"get","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];



const dbAddr = "0xe195208dd5bf78b41d7b554693dbf991c4193d47"
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
function setObj(addr, obj) {
    console.log(addr);
    dbContract.set(addr, JSON.stringify(obj));
}

/**
 * getObj retrieves a piece of information using the database contract
 * @param addr String Address of the data owner
 * @param category String Name of type of data
 * @returns Object Data
 */
function getObj(addr, cb) {
    dbContract.get(addr, function(error, data){
        console.log(addr, data);
        cb(JSON.parse(data));
    });
}

//window.onload = function() {
var bioData, transcriptData, testData;
var data = {};
getObj(selfAddr, setPersonalInfo);

document.querySelector("#addr-input").value = selfAddr;

function setPersonalInfo(dat) {
    data = dat;

    if(dat[CAT_BIO] == undefined) {
        dat[CAT_BIO] = {};
    }

    bioData = dat[CAT_BIO];
    transcriptData = dat[CAT_TRANSCRIPT];
    testData = dat[CAT_TESTS];

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
}


document.querySelector("#update-bio").addEventListener('click', function(){
    var bioData = {};

    bioData.firstName = document.querySelector("#bio-first-name").value;
    bioData.middleName = document.querySelector("#bio-middle-name").value;
    bioData.lastName = document.querySelector("#bio-last-name").value;
    bioData.dob = document.querySelector("#bio-dob").value;
    bioData.languages = document.querySelector("#bio-languages").value;
    bioData.nationality = document.querySelector("#bio-nationality").value;

    data[CAT_BIO] = bioData;

    console.log(data);

    setObj(selfAddr, data);
});


document.querySelector("#search-addr").addEventListener('click', function(){
    getObj(document.querySelector("#addr-input").value, setPersonalInfo);
});
