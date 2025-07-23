import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      console.log(current(anecdoteToVote))
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      }
      return state.map(a => (a.id !== id ? a : votedAnecdote))
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { voteAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions

export const initializeAnecdotes = () =>{
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch =>{
    const newAnecdote = await anecdoteService.createNewAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteFor = (anecdote) =>{
  return async dispatch => {
    const votedAnecdote = await anecdoteService.voteAnecdote(anecdote)
    dispatch(voteAnecdote(votedAnecdote.id))
  }
}

export default anecdoteSlice.reducer
