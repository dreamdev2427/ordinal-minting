const string2json = (string) => {
	try {
		return JSON.parse(string.replace(/\\n/g, ''))
	} catch (error) {
	}
}

module.exports = {
	string2json,
}
