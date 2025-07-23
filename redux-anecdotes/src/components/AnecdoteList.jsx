import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return filter
      ? anecdotes.filter(anecdote =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
      : anecdotes
  })

  const vote = anecdote => {
    dispatch(voteFor(anecdote))
    dispatch(notification(`you voted '${anecdote.content}'`,2))
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
