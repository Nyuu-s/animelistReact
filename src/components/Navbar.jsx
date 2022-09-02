import React, {useEffect} from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { RiNotification3Line } from 'react-icons/ri'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'

import avatar from '../data/avatar.jpg'

import {Notification, UserProfile} from '.'
import { useStateContext } from '../contexts/ContextProvider'

const NavButton = ({title, customFunction, icon, color, dotColor, position}) => (
  <div>

    <TooltipComponent content={title} position="BottomCenter"  style={{position: `${position ? position : undefined}`}}>

      <button 
        type='button'
        onClick={customFunction}
        style={{color}}
        className="relative text-xl rounded-full p-3 hover:bg-light-gray "
      >
        <span style={{background: dotColor}}
        className='rounded-full absolute inline-flex h-2 w-2 right-2 top-2 ' />
        {icon}
        
        
      </button>

    </TooltipComponent>
  </div>
)


const Navbar = () => {
  
  const {activeMenu, setActiveMenu, isClicked, handleClick, screenSize, setScreenSize, currentColor } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)

    window.addEventListener('resize', handleResize)

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if(screenSize <= 900)
      setActiveMenu(false)
    else
      setActiveMenu(true)
  

  }, [screenSize, setActiveMenu])
  
  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  return (
    <div className='flex justify-between p-2 md:ml-6 md:mr-6 relative"'>
        <NavButton
          title="Menu"
          customFunction={handleActiveMenu}
          color={currentColor}
          icon={<AiOutlineMenu />}
          position='fixed'
          
        />
      <div className='flex'>
        <NavButton title="User"
          customFunction={() => handleClick('notification')}
          color={currentColor}
          dotColor='red'
          icon={<RiNotification3Line />}
        />
 
        <TooltipComponent
       
        content="Profile" position='BottomCenter'
        >
          <div 
          className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg'
          onClick={() => handleClick('userProfile')}>
            <img className='rounded-full w-8 h-8' src={avatar} alt="user" />
            <p>
              <span className='text-gray-400 text-14'>Hi, </span> {' '}
              <span className='text-gray-400 font-bold ml-1 text-14'>Michael</span>
            </p>
            <MdKeyboardArrowDown   
            className='text-gray-400 text-14'/>
          </div>
        </TooltipComponent>

        {isClicked.userProfile && <UserProfile />}
        {isClicked.notification && <Notification />}
      </div>
    </div>
  )
}

export default Navbar