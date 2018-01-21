# PROJECT: UNNECESSARY MEMORY (aka Seshat)
Seshat lets a user keep track of their own educational records while also guaranteeing validity for others who want to see accurate information. Instead of requiring a middleman like the CollegeBoard, students can send their info to interested parties (like colleges) directly by sending their Seshat address. Furthermore, trust is established on the network as only whitelisted authorities can make changes to a student's transcript or exam grades (authorities like schools, colleges, test administrators, etc). Furthermore, as a proof of concept, Seshat provides an example exam that can grade a student's answers and directly update their records, showing that even testing can be done in a decentralized fashion.

# Private Chain Setup
Run the following commands in bash from the root of the repository:

- Run `source setup/.env`
- Run `./setup/init`
- Run `./setup/client`
    - This command will run the etherium client. This process must be running
      to communicate with the blockchain. Run all other commands in another
      terminal.

Next open the blockchain terminal with:

- `geth attach`

And type the following commands:

- `personal.newAccount()`
    - This will create a new wallet on the blockchain
    - Your wallet address will be printed
- `eth.defaultAccount = eth.accounts[0]`
    - This will tell the terminal to use your eth wallet
- `miner.start()`
    - Will start mining some etherium for us to use
    - Wait 30 seconds then continue to the next step
- `miner.stop()`
    - Will stop the miner, we probably have enough etherium by now
- `eth.getBalance(eth.coinbase)`
    - Will check how much eth you have

# Smart Contract Deployment
First, inside a `geth attach` terminal, run:

- `personal.unlockAccount(eth.defaultAccount)`
- `miner.start()`

Next, run the following commands in bash from the root of the repository:

- `truffle compile`
- `truffle migrate --reset`

Now, the contract is deployed (and you can stop mining if you want).

# Prepare Webapp
After the smart contract is deployed and the chain is ready, get the DB contract ABI
from the build directory, and get its address with:

- `truffle exec getContractAddress.js`
