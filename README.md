# PROJECT: UNNECESSARY MEMORY (aka Seshat)
The Ejyptian God Of Wisdom, Knowledge, and Writing.

# Table Of Contents
- [Private Chain Setup](#private-chain-setup)

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
