import React, {createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios';
import { getURL } from '../utils/getURL';

import api from '../utils/refreshToken';
const DataContext = createContext();
const url = getURL();
export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({children}) => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksResponse, categoriesResponse, prioritiesResponse] =
          await Promise.all([
            api.get(`${url}TodoTasks`),
            api.get(`${url}TodoCategories`),
            api.get(`${url}TodoPriorities`),
          ]);

        if (tasksResponse.data && categoriesResponse.data && prioritiesResponse.data) {
          setCategories(categoriesResponse.data);
          setPriorities(prioritiesResponse.data);
          setTasks(tasksResponse.data);
          setError('');
        } else {
          setError('Data is missing from the response');
        }
      } catch (error) {
        console.log('Error fetching data: ' + error);
        setError('Error retrieving data from server');
      }
    };
    fetchData();
  }, []);

  const contextValue = {
    tasks,
    setTasks,
    categories,
    setCategories,
    priorities,
    setPriorities,
    error,
  };

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
}