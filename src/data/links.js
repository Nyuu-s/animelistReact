import { AiOutlineUnorderedList } from 'react-icons/ai';
import {TbListDetails} from 'react-icons/tb'
import { FiShoppingBag} from 'react-icons/fi';


export const links = [
    {
      title: 'Dashboard',
      links: [
        {
          name: 'main',
          src: 'main',
          icon: <FiShoppingBag />,
        },
      ],
    },
  
    {
      title: 'Pages',
      links: [
        {
          name: 'animes',
          src: 'animes',
          icon: <AiOutlineUnorderedList />,
        },
        {
          name: 'animes 2',
          src: 'animestest',
          icon: <AiOutlineUnorderedList />,
        },
        {
          name: 'animes details',
          src: 'animesdetails/1',
          icon: <TbListDetails />,
        },
      ],
    },
    // {
    //   title: 'Apps',
    //   links: [
    //     {
    //       name: 'calendar',
    //       src: 'calendar',
    //       icon: <AiOutlineCalendar />,
    //     },
    //   ],
    // },
  ];