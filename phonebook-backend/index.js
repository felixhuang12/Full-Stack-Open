require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

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

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    }).catch(err => next(err))
})

app.get('/info', (request, response, next) => {
    const currentDate = new Date().toLocaleString();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    Person.find({}).then(persons => {
        response.send(`<div>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${currentDate} (${timeZone})</p>
        </div>`)
    }).catch(err => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        if (person){
            res.json(person)
        }
        else{
            res.status(404).end()
        }
    }).catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body
    console.log(body)
    if (!(body.name && body.number)){
        return res.status(400).json({
            error: "Content missing"
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        console.log(`Added ${person.name} with number ${person.number} to phonebook`)
        console.log(savedPerson)
        res.json(savedPerson)
    }).catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id).then((person) => {
        if (person){
            res.json(person)
        }
        else{
            res.status(204).end()
        }
    }).catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    const updatedPerson = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, updatedPerson, 
        {new: true, runValidators: true, context: 'query'})
        .then(result => {
            console.log(result)
            res.json(result)
    }).catch(err => next(err))
})

const unknownEndpoint = (request, res) => {
    res.status(404).send({ error: "unknown endpoint" })
}
  
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    if (error.name === 'CastError'){
        console.log(error.message)
        return res.status(400).send({error: 'Malformatted id'})
    }
    else if (error.name === 'ValidationError'){
        console.log(error.message)
        return res.status(400).send(error.message) // or return error in JSON format:
        // res.status(400).json(error: {error.message})
    }
    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})