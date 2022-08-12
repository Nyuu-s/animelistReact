import { AiOutlineCalendar, AiOutlineShoppingCart } from 'react-icons/ai';
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
          icon: <AiOutlineShoppingCart />,
        },
        {
          name: 'animes 2',
          src: 'animestest',
          icon: <AiOutlineShoppingCart />,
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