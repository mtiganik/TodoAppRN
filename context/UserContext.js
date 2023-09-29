import React, {createContext, useContext, useState} from 'react';

export const UserContext = createContext();

export const useUser= () => {
  return useContext(UserContext);
}
const emptyUser = {
  token: '',
  refreshToken: '',
  email: '',
  firstName: '',
  lastName: ''

}
export const UserProvider = ({children}) => {
  const [user, setUser] = useState(emptyUser)
  return(
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}