const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
    ].join(' ')
  }))
app.use(cors())
app.use(express.static('build'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const numPeople = persons.length
    console.log(numPeople)
    const currentDate = new Date().toLocaleString();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    response.send(`<div>
        <p>Phonebook has info for ${numPeople} people</p>
        <p>${currentDate} (${timeZone})</p>
    </div>`)
    // const date = new Date()
    // response.send(`${date}`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    console.log(person)
    if (person){
        res.json(person)
    }
    else{
        res.status(404).end()
    }
})
const generateId = () => {
    return Math.floor(Math.random() * (99999) + 1)
}
app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log(body)
    if (!(body.name && body.number)){
        return res.status(400).json({
            error: "Content missing"
        })
    }
    const name = body.name
    const exist = persons.find(person => person.name === name)
    if (exist){
        return res.status(400).json({
            error: "Name must be unique"
        })
    }
    const newPerson = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(newPerson)
    res.json(persons)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
  }
  
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})