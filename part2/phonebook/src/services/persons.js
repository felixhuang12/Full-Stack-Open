import axios from 'axios'
const url = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const create = (newPerson) => {
    const request = axios.post(url, newPerson)
    return request.then(response => response.data)
}

const update = (id, newPerson) => {
    if (window.confirm(
        `${newPerson.name} is already added to phonebook. Replace the old number with a new one?`))
        {
            const request = axios.put(`${url}/${id}`, newPerson)
            return request.then(response => response.data)
    }
}

const deletePerson = (id) => {
    if (window.confirm('Do you really want to delete this person?')){
        const request = axios.delete(`${url}/${id}`)
        return request.then(response => response.data)
    }
}

export default { getAll, create, update, deletePerson }