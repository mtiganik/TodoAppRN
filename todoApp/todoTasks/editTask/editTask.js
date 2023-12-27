import { useState, useEffect } from "react";

import { View, Text, Button, TextInput, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import { getURL } from "../../../utils/getURL";
import { commonStyles } from "../../../utils/styles";
import { DropDownMenu } from "../createTask/dropDownMenu";
import { useDataContext } from "../../../context/DataContext";
import { DataProvider } from "../../../context/DataContext";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { SortInput } from "../../../utils/sortInput";
import { CalendarItem } from "../../../utils/calendarItem";
import { formatDateToUI, formatDateToISO } from "../../../utils/formatDate";

const url = getURL()

export const EditTask = ({ taskId, category, priority }) => {
  const { priorities, categories } = useDataContext()
  const [error, setError] = useState("")

  const [task, setTask] = useState({
    taskName: "",
    taskSort: "",
    dueDt: "",
    categoryId: "",
    priorityId: "",
  })

  
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("In editTask useEffect")
        const response = await axios.get(`${url}TodoTasks/${taskId}`)
        setTask({
          taskName: response.data.taskName,
          taskSort: response.data.taskSort,
          dueDt: response.data.dueDt,
          categoryId: response.data.todoCategoryId,
          priorityId: response.data.todoPriorityId,
        })

      } catch (error) {
        console.error(error)
        setError("Error retrieving data from server")
      }
    };
    fetchData()
  }, [])

  const handleGoBack = () => {
    navigation.navigate("Home")
  }
  const handleEdit = async() => {
    try{
      const response = await axios.put(`${url}TodoTasks/${taskId}`,
      {
        id: taskId,
        taskName: task.taskName,
        taskSort: task.taskSort,
        dueDt: task.dueDt,
        todoCategoryId: task.categoryId,
        todoPriorityId: task.priorityId
      }
      )
      navigation.navigate("Home", {successMessage:"Task updated!"})

    }catch(error){
      console.error(error)
      setError("Error updating task")
    }
  }
  const handleSelectPriority = (value) => {
    setTask({...task, priorityId: value})
  }
  const handleSelectCategory = (value) => {
    setTask({...task, categoryId: value})
  }
  const handleSetDueDt = (value) => {
    setTask({...task, dueDt:formatDateToISO(value)})
  }
  const handleTaskSort = (value) => {
    setTask({...task, taskSort:value})
  }

  return (
    <ScrollView>
      {task && priorities && categories && (
        <View>

          <Text style={{ fontSize: 20, fontWeight: "400" }}>Edit Task</Text>
          <Text>Task name</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder={task.taskName}
            value={task.taskName}
            onChangeText={(text) => setTask({...task, taskName: text})}
          />
          <SortInput sortValue={task.taskSort} setSortValue={handleTaskSort} defaultValue={task.taskSort} />
          <DropDownMenu items={priorities} onSelectItem={handleSelectPriority} defaultLabel={priority.priorityName} label="priority" />
          <DropDownMenu items={categories} onSelectItem={handleSelectCategory} defaultLabel={category.categoryName} label="category" />
          <Text>Due Date: {formatDateToUI(task.dueDt)}</Text>
          <CalendarItem selectedDate={task.dueDt} setSelectedDate={handleSetDueDt} />
          <Button title="Edit" onPress={handleEdit} />
        </View>

      )}
      <Text style={commonStyles.errorText}>{error}</Text>
      <Button title="Back" onPress={handleGoBack} />
    </ScrollView>
  )
}

export const EditTaskWrapper = () => {
  const route = useRoute();
  const {taskId, category, priority} = route.params;

  return(
      <EditTask taskId={taskId} category={category} priority={priority}/>
  )
}

const styles = StyleSheet.create({
  textInputStyle: {
    fontSize: 18,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    borderWidth: 1,
  }
})


