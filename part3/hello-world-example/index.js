const express = require('express')
const app = express()

app.use(express.json()) // json-parser implemented

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2022-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2022-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2022-05-30T19:20:14.298Z",
      important: true
    }
  ]
  // Express sets Content-Type header to text/html
  // status code of response defaults to 200
  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

  // handle all HTTP GET requests of form /api/notes/SOMETHING
  // something is arbitary string
  app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id) // id in GET request is a string, but id in notes is number
    // the "triple equals" comparison === considers all values 
    // of different types to not be equal by default, meaning that 1 is not '1'.
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
    }
    else{
        response.status(404).end()
    }    

    response.json(note)
  })

  // found on http://localhost:3001/api/notes
  // Express automatically sets Content-Type to application/json
  app.get('/api/notes', (request, response) => {
    response.json(notes) // JSON.stringify
  })

  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end() // 204 no content status
  })

  const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }

  app.post('/api/notes', (request, response) => {
    const body = request.body // body property would be undefined w/o json-parser
    // json-parser takes JSON data of request, transforms it into JS object,
    // then attaches it to body property of request object before route handler called
    if (!body.content) {
        return response.status(400).json({ // 400 bad request status
          error: 'content missing' 
        })
    }
    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    }
    notes = notes.concat(note)
    console.log(note)
    response.json(note)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })