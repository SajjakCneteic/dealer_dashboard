import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [isNavigationDisabled, setIsNavigationDisabled] = useState(false);

  return (
    <NavigationContext.Provider value={{ isNavigationDisabled, setIsNavigationDisabled }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);
