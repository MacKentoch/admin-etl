// import { appConfig } from '../config';

export const navigation = {
  brand:      'actAdmin',
  leftLinks:  [],
  rightLinks: [
    // {
    //   label:      'Home',
    //   link:       '/',
    //   view:       'home',
    //   isRouteBtn: true
    // }
  ],
  sideNavMenu: [
    // group menu #1
    {
      id: 1,
      groupe: 'General',
      menus: [
        {
          name: 'home',
          linkTo: '/',
          faIconName: 'fa-home'
        }
      ]
    },
    // group menu #2
    {
      id: 2,
      groupe: 'Edit Interface',
      menus: [
        {
          name: 'interfaces',
          linkTo: '/interfaces',
          faIconName: 'fa-list'
        }
        // {
        //   name: 'log',
        //   linkTo: '/',
        //   faIconName: 'fa-table'
        // }
      ]
    },
    // group menu #3
    {
      id: 3,
      groupe: 'Interfaces logs',
      menus: [
        {
          name: 'logs',
          linkTo: '/',
          faIconName: 'fa-file-o'
        }
      ]
    }
  ]
};

export default navigation;
