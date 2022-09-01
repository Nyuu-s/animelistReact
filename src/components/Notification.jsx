import React, {useState, useEffect} from 'react'
import { useStateContext } from '../contexts/ContextProvider'

const {api} = window
const Notification = () => {
 
  const {notifications, setNotifications} = useStateContext();
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    var indexAlreadyExist =  notifications.findIndex((notification) => (notification.id === 'download'))
    if(indexAlreadyExist !== -1)
      setIsDownloading(true)
    var temp = [...notifications]
    api.recieve('update:download', (args) => {
      var notif = {message: args[0], id: 'download'}

      
      
      if(indexAlreadyExist !== -1)
      {
        temp[indexAlreadyExist] = notif
      }
      else
      {
        temp.push(notif)
      }
      setNotifications(temp)
    })

    api.recieve('notification:message', (args) => {
        var notif = {message: args[0], id: indexAlreadyExist !== -1 ? notifications.length -1 : notifications.length }
        temp.push(notif)
        setNotifications(temp)
    })



    console.log(notifications);
  }, [notifications])
  
  return (
    <div  className='absolute rounded-md p-2 top-14 left-5/6 w-45 h-60 bg-white'>
      <p className='font-bold text-center mb-2'>Notification Center</p>
      {isDownloading && notifications.find((item) => (item.id === 'download')).message}

      {  notifications.map((item, i) => {
        if(item.id !== 'download')
          return(
            <p key={i}>{item.message}</p>
          )
      })}
      
    </div>
  )
}

export default Notification