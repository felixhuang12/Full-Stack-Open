const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://felixhuang12:${password}@cluster0.ffjo3.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.connect(url)

// // Schema: each Schema maps to a MongoDB collection and defines shape of documents
// // within that collection
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

// first argument is singular name of collection the model is for
// second argument is what you want to copy
const Note = mongoose.model('Note', noteSchema)

// // create new note object with help of Note model
// const note = new Note({
//   content: 'HTML is Easy',
//   date: new Date(),
//   important: true,
// })

// // saving object to database
// // then event handler is called
// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })


// print all notes in database to console
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})

// filter notes that are important
Note.find({ important: true }).then(result => {
  // ...
})
