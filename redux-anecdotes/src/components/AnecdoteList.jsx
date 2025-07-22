import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = id => {
    dispatch(voteAnecdote(id))
  }

  const anecdotesOrderedByVotes = [...anecdotes].sort(
    (a, b) => b.votes - a.votes
  )

  const style = {
    padding: 2,
    border: 'solid',
    borderWidth: 1,
    margin: 3,
  }
  return (
    <div>
      {anecdotesOrderedByVotes.map(anecdote => (
        <div key={anecdote.id} style={style}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
