import { useNotificationValue } from './NotificationContext'

const style = {
  border: 'solid',
  padding: 10,
  borderWidth: 1,
  marginBottom: 5,
  height: '20px'
}
const Notification = () => {
  const notification = useNotificationValue()

  return <div style={style}>{notification}</div>
}

export default Notification
