const  fs = require('fs/promises')
const path = require('path')

const notesPath  = path.join(__dirname, 'db.json')

async function addNote(title) {
    const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)

    await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function removeNote(id) {
    const notes = await getNotes()

    const newNotes = notes.filter((elem) => elem.id !== String(id))
    await fs.writeFile(notesPath, JSON.stringify(newNotes))
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function updateNote(data) {
    const notes = await getNotes()
    const updatedNotes = notes.map((elem) => {
        if (elem.id === data.id){
            elem = data
        }
        return elem
    })
    await fs.writeFile(notesPath, JSON.stringify(updatedNotes))
}


module.exports = {
    addNote, getNotes, removeNote, updateNote
}
