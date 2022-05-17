const e = require('express')
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please enter at least password argument.')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

console.log(name);
console.log(number);

const url =
  `mongodb+srv://felixhuang12:${password}@cluster0.ffjo3.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

if (!(name && number)){
    Person.find({}).then(persons => {
        persons.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}
else{
    const person = new Person({
        name: name,
        number: number,
    })
      
    person.save().then(result => {
        console.log(`added ${name} with number ${number} to phonebook`)
        mongoose.connection.close()
    })
}