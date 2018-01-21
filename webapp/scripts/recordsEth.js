/**
 * ethConnect connects to the geth rpc connection.
 * @returns Web3 object with Etherium API
 */
function ethConnect() {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
}

// Connect to geth API
web3 = ethConnect();

// Constants
var dbAbi = [{"constant": false,"inputs": [{"name": "str","type": "string"}],"name": "set","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "addr","type": "address"}],"name": "get","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"inputs": [],"payable": false,"stateMutability": "nonpayable","type": "constructor"}];

const dbAddr = "0x3fd9fb67867057f2c0fc15d029b207f4219428fe"
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

}

/**
 * getObj retrieves a piece of information using the database contract
 * @param addr String Address of the data owner
 * @param category String Name of type of data
 * @returns Object Data
 */
function getObj(add, category) {
}
