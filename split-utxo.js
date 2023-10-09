const {
	readFileSync,
} = require('fs')

const {
	execSync
} = require('child_process')

const {
	NETWORK,
	WALLET,
} = require('./config.js')

function splitUtxo(addressPath, amount) {
	try {
		const addressData = readFileSync(addressPath)
		const addresses = JSON.parse(addressData)

		const data = {}

		for (const address of addresses) {
			data[address] = amount / 10 ** 8
		}

		const execOut = execSync(`bitcoin-cli ${NETWORK} -rpcwallet=${WALLET} sendmany '' '${JSON.stringify(data)}'`)
		console.log(execOut.toString())
	} catch (error) {
		console.error(error)
	}
}

const address_path = 'addresses.json'
const amount = 100000

splitUtxo(address_path, amount)