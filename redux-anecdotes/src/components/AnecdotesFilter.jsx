import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const AnecdotesFilter = () => {
  const dispatch = useDispatch()

  const handleChange = event => {
    const filter = event.target.value
    dispatch(setFilter(filter))
  }

  return (
    <div>
      filter
      <input type='text' name='filter' onChange={handleChange} />
    </div>
  )
}

export default AnecdotesFilter
