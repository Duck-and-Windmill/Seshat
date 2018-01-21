if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

var abi = [
      {
          "constant": false,
          "inputs": [
          {
              "name": "str",
              "type": "string"
          }
          ],
          "name": "set",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "constant": false,
          "inputs": [
          {
              "name": "addr",
              "type": "address"
          }
          ],
          "name": "get",
          "outputs": [
          {
              "name": "",
              "type": "string"
          }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "constructor"
      }
      ];

var def = web3.eth.contract(abi);
var contract = def.at('0x3fd9fb67867057f2c0fc15d029b207f4219428fe')
web3.eth.defaultAccount = web3.eth.coinbase;
var coinbase = web3.eth.coinbase;
var balance = web3.eth.getBalance(coinbase);

contract.set("hey noah it worked");
setTimeout(function(){
    console.log(contract.get.call(web3.eth.defaultAccount))
}, 3000);
