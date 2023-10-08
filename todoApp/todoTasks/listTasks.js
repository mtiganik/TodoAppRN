import { useState, useEffect } from "react"
import { getURL } from "../../utils/getURL";
import { View, ScrollView, Button, Text } from "react-native";
import { commonStyles } from "../../utils/styles";
import axios from "axios";
import { ViewTask } from "./viewTask";
const url = getURL()

export const ListTask = () => {
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [priorities, setPriorities] = useState([])
  const [error, setError] = useState('')
  

  useEffect( () => {
    const fetchData = async() => {
      try{
        const [tasksResponse, categoriesResponse, prioritiesResponse] 
        = await Promise.all([
          axios.get(`${url}TodoTasks`),
          axios.get(`${url}TodoCategories`),
          axios.get(`${url}TodoPriorities`)
        ])
        setTasks(tasksResponse.data);
        setCategories(categoriesResponse.data);
        setPriorities(prioritiesResponse.data);
        setError("")
      }catch(error){
        console.log("Error fetching data: " + error)
        setError("Error retrieving data from server")
      }
    }
    fetchData();
  }, []);

  function mapById(array){
    return array.reduce((acc, obj) =>{
      acc[obj.id] = obj;
      return acc;
    }, {});
  }

  const categoryMap = mapById(categories);
  const priorityMap = mapById(priorities);

  return(
    <View> 
      {tasks.length > 0 &&
        (
          <ScrollView>
        {tasks.map(task => (

          <ViewTask key={task.id} 
          task={task} 
          category={categoryMap[task.todoCategoryId]}
          priority={priorityMap[task.todoPriorityId]}
          setTasks={setTasks}/>
        ))}
      </ScrollView>
        )
      }
      <Text style={commonStyles.errorText} >{error}</Text>
  </View>
  )
}

