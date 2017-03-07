const toggleSideMenuStateKEY = 'toggleSideMenuStateKEY';

export const getSideMenuState = () => {
  const defaultSideMenuStateVALUE = true;

  if (localStorage) {
    if (localStorage.getItem(toggleSideMenuStateKEY)) {
      return JSON.parse(localStorage.getItem(toggleSideMenuStateKEY));
    } else {
      localStorage.setItem(toggleSideMenuStateKEY, JSON.stringify(defaultSideMenuStateVALUE));
      return JSON.parse(localStorage.getItem(toggleSideMenuStateKEY));
    }
  } else {
    /* eslint-disable no-console */
    console.warn('no localStorage available...');
    /* eslint-enable no-console */
    return null;
  }
};

export const setSideMenuState = (state) => {
  if (localStorage) {
    localStorage.setItem(toggleSideMenuStateKEY, JSON.stringify(state));
    return true;
  } else {
    /* eslint-disable no-console */
    console.warn('no localStorage available...');
    /* eslint-enable no-console */
    return false;
  }
};
