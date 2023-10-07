import { useState, useEffect } from "react"
import { getURL } from "../../utils/getURL";
import { View, ScrollView, Button, Text } from "react-native";
import { commonStyles } from "../../utils/styles";
import axios from "axios";
import { ViewTask } from "./viewTask";
const url = getURL()

export const ListTask = () => {
  const [tasks, setTasks] = useState([])
  const[categories, setCategories] = useState({})

  const [taskList, setTaskList] = useState({})
  const [error, setError] = useState('')
  

  useEffect( () => {
    const fetchData = async() => {
      try{
        const response = await axios.get(`${url}TodoTasks`)
        // console.log(response.data)
        setTaskList(response.data)
        setError("")

      }catch(error){
        console.log("Error occured: " + error)
        setError("Error retrieving data from server")
      }
    }
    fetchData();
  }, []);


  return(
    <View> 
      {taskList.length > 0 &&
        (
          <ScrollView>
        {taskList.map(task => (
          <ViewTask key={task.id} task={task} setTaskList={setTaskList}/>
        ))}
      </ScrollView>
        )
      }
      <Text style={commonStyles.errorText} >{error}</Text>
  </View>
  )
}

