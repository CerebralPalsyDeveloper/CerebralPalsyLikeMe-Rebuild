export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  CONTACT: '/contact',
  LOGIN: '/login',
  SIGNUP: '/signup',
  ACCOUNT: '/account',
};

export function getRoutes() {
  return [
    { name: 'Home', path: ROUTES.HOME },
    { name: 'About', path: ROUTES.ABOUT },
    { name: 'Services', path: ROUTES.SERVICES },
    { name: 'Contact Us', path: ROUTES.CONTACT },
  ];
} 