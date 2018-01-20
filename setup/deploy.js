/*
File holds code snippets used in geth console.  

Execute with:

	geth --exec 'loadScript("./src/client.js"); fn();' attach ./data/geth.ipc
*/

/**
 * bal retrieves the primary account balance
 */
function bal() {
	console.log("getting account balance");
	console.log("account: ", web3.eth.accounts[0]);
	console.log("balance: ", eth.getBalance(web3.eth.accounts[0]));
}

/**
 * unlock grants access the development wallet
 */
function unlock() {
	personal.unlockAccount(web3.eth.accounts[0], "password");
}

/**
 * deploy registers a new smart contract
 * @param abi Array<Object> Solidity script ABI. Retrieve via `solc --abi <src>` 
 *			    command in terminal
 * @param bin String Script binary contents
 */
function deploy(abi, bin) {
	console.log("deploying dapp");
	console.log("abi: ", abi);
	console.log("bin: ", bin);

	// Unlock account
	unlock();

	// Load definition
	var def = web3.eth.contract(abi);

	// Get gas estimation
	var gas = web3.eth.estimateGas({data: bin});
	
	// Create new contract
	var contract = def.new({
		from: web3.eth.accounts[0],
		data: bin,
		gas: gas
	}, newContractCallback);

	console.log("deployed dapp, mine to continue");
}

/**
 * newContractCallback runs when a new contract is deployed
 * @param e ? Error
 * @param contract ? Etherium contract
 */
function newContractCallback(err, contract) {
	// If no error
	if (!err) {
		// If callback not deployed yet
		if (!contract.address) {
			console.log("contract transaction: ", contract.transactionHash);
		} else {
			// If deployed
			console.log("contract address: ", contract.address);
		}
	} else {
		// Print error
		console.log("contract error: ", err);
	}
}
