import { createSlice, current } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

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
    createAnecdote(state, action) {
      const anecdote = {
        content: action.payload,
        id: getId(),
        votes: 0,
      }
      state.push(anecdote)
    },
    setAnecdotes(state,action){
      return action.payload
    },
  },
})

export const {voteAnecdote, createAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer
