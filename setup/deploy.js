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
