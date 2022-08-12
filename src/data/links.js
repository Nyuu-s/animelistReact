import { AiOutlineCalendar, AiOutlineUnorderedList } from 'react-icons/ai';
import {TbListDetails} from 'react-icons/tb'
import { FiShoppingBag} from 'react-icons/fi';
import { BsKanban } from 'react-icons/bs';
import { IoMdContacts } from 'react-icons/io';

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
          src: 'animesdetails',
          icon: <TbListDetails />,
        },
      ],
    },
    {
      title: 'Apps',
      links: [
        {
          name: 'calendar',
          src: 'calendar',
          icon: <AiOutlineCalendar />,
        },
        {
          name: 'todo-list',
          src: 'todo-list',
          icon: <BsKanban />,
        },
      ],
    },
  ];