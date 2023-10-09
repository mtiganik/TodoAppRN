import { useState, useEffect } from "react"
import { getURL } from "../../utils/getURL";
import { View, ScrollView, Button, Text, StyleSheet } from "react-native";
import { commonStyles } from "../../utils/styles";
import axios from "axios";


import { SvgXml } from "react-native-svg";
import { GarbagePin, CheckSign } from "../../utils/SvgImages";

import {DisplayPriority} from "./displayPriority";

const url = getURL()

export const ViewTask = ({task, category, priority, setTasks}) => {
  const [error, setError] = useState("")
  const [isCompleted, setIsCompleted] = useState(task.isCompleted)

  const onMarkAsDone = async() => {
    try{
      await axios.put(`${url}TodoTasks/${task.id}`,{
        ...task,
        isCompleted: !isCompleted
      })
      setTasks((prevTasks) =>
      prevTasks.map((prevTask) =>
      prevTask.taskId === task.taskId ?
      { ...prevTask, isCompleted: !isCompleted } : prevTask)
      )
      setIsCompleted(!isCompleted)

    }catch(error){
      console.error("Error makring done: " , error)
      setError("Error")
    }
  }
  const onRemoveTask = async() => {
    try{
      console.log(`${url}TodoTasks/${task.id}`)
      //const response = 
      await axios.delete(`${url}TodoTasks/${task.id}`)
      setTasks((prevTasks) => 
      prevTasks.filter((task) => task.id !== category.id))

    }catch(error){
      console.error("Error removing data: " , error)
      setError("")
    }

  }
  return(
    <View style={[styles.container,{
      backgroundColor: isCompleted ? "green" : "red"
    }]}>
      <Text>{task.taskName}</Text>
      <Text>Category: {category.categoryName}</Text>
      <Text>Completed: {isCompleted ? "Yes" : "No"}</Text>
      <Text>Is Archieved: {category.isArchived ? "Yes" : "No"}</Text>
      <Text>Created: {category.createdDt}</Text>
      <Text>Due Date: {category.dueDt}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <SvgXml
        xml={GarbagePin}
        width={25}
        height={25}
        onPress={onRemoveTask}
      />
      <SvgXml
        xml={CheckSign}
        width={25}
        height={25}
        onPress={onMarkAsDone}
      />
      </View>


      <DisplayPriority priority = {priority}/>
      <Text style={commonStyles.errorText}>{error}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    borderWidth:1,
    borderRadius:5,
    padding:5,
    margin:5
  }
})