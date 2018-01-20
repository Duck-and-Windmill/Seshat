# Seshat
The Ejyptian God Of Wisdom, Knowledge, and Writing.

# Table Of Contents
- [Private Chain Setup](#private-chain-setup)

# Private Chain Setup
## Connection Parameters
To connect to the Seshat chain you must configure your client with custom
connection parameters.

```
geth -identity "<node name>" init setup/genesis.json -datadir <data dir>`
```

- `<node name>`: The name the node will be known by
- `<data dir>`: Custom data directory for the blockchain, must be separate
	   from the main Etherium blockchain


## Connecting
Next connect to the Seshat blockchain with Geth.

```
geth --datadir <data dir> --networkid "<chain id>"
```

- `<data dir>`: Custom blockchain directory from step above
- `<chain id>`: Unique id of chain. Found in `config.chainId` field of
	        `setup/genesis.json` file
