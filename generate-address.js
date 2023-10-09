const {
	writeFileSync,
} = require('fs')

const {
	execSync,
} = require('child_process')

const {
	NETWORK,
	WALLET,
} = require('./config.js')

const {
	string2json,
} = require('./util.js')

function generateAddress(addressCount, savePath) {
	try {
		const addresses = []

		for (let index = 0; index < addressCount; index++) {
			const execOut = execSync(`ord ${NETWORK}  --wallet ${WALLET} wallet receive`)
			const address = string2json(execOut.toString()).address
			
			addresses.push(address)
			console.log(address)
		}

		writeFileSync(savePath, JSON.stringify(addresses))
	} catch (error) {
		console.error(error)
	}
}

const address_count = 20
const save_path = 'addresses.json'

generateAddress(address_count, save_path)