import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAll, updateAnecdote } from '../request'
import { useNotificationDispatch } from './NotificationContext'

const AnecdoteList = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: updatedAnecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map(anecdote =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        )
      )
    },
  })

  const handleVote = anecdote => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    voteMutation.mutate(updatedAnecdote)
    notificationDispatch({ type: 'voted', payload: updatedAnecdote.content })
    setTimeout(() => {
      notificationDispatch({ type: 'clear' })
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: false,
  })

  if (result.isPending) {
    return <div>Loading...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
