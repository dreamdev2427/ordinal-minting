const {
	writeFileSync,
} = require('fs')

const {
	execSync
} = require('child_process')

const {
	string2json,
} = require('./util.js')

function inscribeOrdinal(receiveAddress, feeRate, dir, startIndex, endIndex, fileExtension, savePath) {
	try {
		const inscribeInfos = []

		for (let index = startIndex; index <= endIndex; index++) {
			const fileName = `${index}.${fileExtension}`
			const filePath = `${dir}/${fileName}`

			const execOut = execSync(`ord wallet inscribe --destination ${receiveAddress} --fee-rate ${feeRate} ${filePath}`)
			const inscribeInfo = string2json(execOut.toString())

			inscribeInfo.file_index = index
			inscribeInfo.file_name = fileName
			inscribeInfos.push(inscribeInfo)
			console.log(inscribeInfo)
		}

		writeFileSync(savePath, JSON.stringify(inscribeInfos))
	} catch (error) {
		console.error(error)
	}
}

const receive_address = 'bc1pw0rrzcxz4wjy4l62rw6hmnwmf30hpzrg2lw6d0vn9crn7d49352quztx0a'
const fee_rate = 20
const dir = '/ordinal-mint/images/01'
const start_index = 31
const end_index = 50
const file_extension = 'png'
const save_path = `${start_index}-${end_index}.json`

inscribeOrdinal(receive_address, fee_rate, dir, start_index, end_index, file_extension, save_path)