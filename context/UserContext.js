import React, {createContext, useContext, useState} from 'react';

const UserContext = createContext();

export const useUser= () => {
  return useContext(useContext);
}

export const UserProvider = ({children}) => {
  const [user, setUser] = useState({
    token: '',
    email: '',
    firstName: '',
    lastName: ''
  })
  return(
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}