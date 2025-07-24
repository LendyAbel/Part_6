import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
    const result = await axios.get(baseUrl)
    return result.data
}

export const createNew = async newAnecdote => {
    const result = await axios.post(baseUrl, newAnecdote)
    return result.data
}