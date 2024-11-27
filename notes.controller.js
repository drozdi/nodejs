const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
	const notes = await getNotes()
	const note = {
		title,
		id: Date.now().toString(),
	}

	notes.push(note)

	await saveNotes(notes)
	console.log(chalk.bgGreen('Note was added!'))
}

async function getNotes() {
	const notes = await fs.readFile(notesPath, { encoding: 'utf-8' })
	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function saveNotes(notes) {
	await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function printNotes() {
	const notes = await getNotes()

	console.log(chalk.bgBlue('Here is the list of notes:'))
	notes.forEach(note => {
		console.log(chalk.bgWhite(note.id), chalk.blue(note.title))
	})
}

async function removeNote(id) {
	const notes = await getNotes()

	const filtered = notes.filter(note => note.id !== id)

	await saveNotes(filtered)
	console.log(chalk.red(`Note with id="${id}" has been removed.`))
}

async function editNote(id, title) {
	let notes = await getNotes()
	notes = notes.map(note => (note.id === id ? { ...note, title } : note))
	await saveNotes(notes)
	console.log(chalk.bgGreen(`Note with id="${id}" has been updated!`))
}

module.exports = {
	addNote,
	getNotes,
	removeNote,
	editNote,
}
