import { useState, useEffect } from "react"
import { getURL } from "../../utils/getURL";
import { View, ScrollView, Button, Text, StyleSheet, TouchableOpacity } from "react-native";
import { commonStyles } from "../../utils/styles";
import axios from "axios";
import { useDataContext } from "../../context/DataContext";

import { SvgXml } from "react-native-svg";
import { GarbagePin, CheckSign, EditIcon } from "../../utils/SvgImages";

import { useNavigation } from "@react-navigation/native";
import {DisplayPriority} from "./displayPriority";
import { EditTask } from "./editTask/editTask";
import { formatDateToUI } from "../../utils/formatDate";
const url = getURL()

export const ViewTask = ({task, category, priority, setTasks}) => {

  const { setSuccessMessage} = useDataContext();
  const navigation = useNavigation();
  const [error, setError] = useState("")
  const [isCompleted, setIsCompleted] = useState(task.isCompleted)

  const onMarkAsDone = async() => {
    try{
      await axios.put(`${url}TodoTasks/${task.id}`, {
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
  const onRemoveTask = async () => {
    try {
      await axios.delete(`${url}TodoTasks/${task.id}`)
      setSuccessMessage("Succesfully removed task")
      setTasks((prevTasks) =>{
        return prevTasks.filter((curr) => curr.id !== task.id)
      })
    } catch (error) {
      console.error("Error removing data: ", error)
      setError("")
    }
  }
  const onEdit = () => {
    return navigation.navigate('EditTask', {taskId: task.id, category: category, priority:priority})
  }


  return(
    <View style={[styles.container,{
      backgroundColor: isCompleted ? "springgreen" : "orangered"
    }]}>
      <View style={styles.leftContent}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{task.taskName}</Text>
        <Text>Category: {category.categoryName}</Text>
        <Text>Completed: {isCompleted ? "Yes" : "No"}</Text>
        <Text>Created: {formatDateToUI(task.createdDt)}</Text>
        <Text>Due Date: {formatDateToUI(task.dueDt)}</Text>
        <DisplayPriority priority={priority} />
        <Text style={commonStyles.errorText}>{error}</Text>
      </View>


      <View style={styles.rightContent}>
      

        <TouchableOpacity onPress={onMarkAsDone}>
          <View style={styles.button} >
            <SvgXml
              xml={CheckSign}
              width={25}
              height={25}
            />
            <Text style={styles.buttonText}>MARK DONE</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={onEdit}>
          <View style={styles.button} >
            <SvgXml
              xml={EditIcon}
              width={25}
              height={25}
            />
            <Text style={styles.buttonText}>EDIT</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={onRemoveTask}>
          <View style={styles.button}>
            <SvgXml
              xml={GarbagePin}
              width={25}
              height={25}
            />
            <Text style={styles.buttonText}>DELETE</Text>
          </View>
        </TouchableOpacity>

      </View>


    </View>
  )
}


const styles = StyleSheet.create({
  button:{
    flexDirection: 'row',
    alignItems:"center",
    backgroundColor:"#24a0ed",
    borderRadius:5,
    margin:3,
    padding:3

  },
  buttonText:{
    fontWeight:"500",
    color:"white"
  },
  container:{
    borderWidth:1,
    borderRadius:5,
    padding:5,
    margin:5,
    flex:1,
    justifyContent: 'center',
    flexDirection: 'row',

  },
  leftContent:{
    flex:3
  },
  rightContent:{
    flex:2,
    justifyContent:"center"
  }
})