const {
	readFileSync,
	writeFileSync,
} = require('fs')

const {
	execSync
} = require('child_process')

function convertInfo(loadPath, savePath) {
	try {
		const infoData = readFileSync(loadPath)
		const infos = JSON.parse(infoData)

		const result = []

		for (const info of infos) {
			result.push({
				"file name": info.file_name,
				"inscription": info.inscription,
			})
		}

		writeFileSync(savePath, JSON.stringify(result))
	} catch (error) {
		console.error(error)
	}
}

const load_path = 'inscriptions.json'
const save_path = 'result.json'

convertInfo(load_path, save_path)