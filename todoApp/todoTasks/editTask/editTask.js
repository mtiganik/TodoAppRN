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

  const [taskName, setTaskName] = useState()
  const [taskSort, setTaskSort] = useState("")
  const [dueDt, setDueDt] = useState()
  const [categoryId, setCategoryId] = useState()
  const [priorityId, setPriorityId] = useState()

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("In editTask useEffect")
        const response = await axios.get(`${url}TodoTasks/${taskId}`)

        setTaskName(response.data.taskName)
        setTaskSort(response.data.taskSort)
        setDueDt(response.data.dueDt)
        setCategoryId(response.data.todoCategoryId)
        setPriorityId(response.data.todoPriorityId)

        // console.log("taskSort: ", typeof(taskSort))
        // console.log("taskSort: ", taskSort)
        // console.log("dueDt: ", dueDt)
        // console.log("todoCategoryId: ", categoryId)
        // console.log("todoPriorityId: ", priorityId)

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
        taskName: taskName,
        taskSort: taskSort,
        dueDt: dueDt,
        todoCategoryId: categoryId,
        todoPriorityId: priorityId
      }
      )
      navigation.navigate("Home", {successMessage:"Task updated!"})

    }catch(error){
      console.error(error)
      setError("Error updating task")
    }
  }
  const handleSelectPriority = (value) => {
    setPriorityId(value)
  }
  const handleSelectCategory = (value) => {
    setCategoryId(value)
  }
  const handleSetDueDt = (value) => {
    setDueDt(formatDateToISO(value))
  }
  const handleTaskSort = (value) => {
    setTaskSort(value)
  }

  return (
    <ScrollView>
      {priorityId && priorities && categories && (
        <View>

          <Text style={{ fontSize: 20, fontWeight: "400" }}>Edit Task</Text>
          <Text>Task name</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder={taskName}
            value={taskName}
            onChangeText={setTaskName}
          />
          <SortInput sortValue={taskSort} setSortValue={handleTaskSort} defaultValue={taskSort} />
          <DropDownMenu items={priorities} onSelectItem={handleSelectPriority} defaultLabel={priority.priorityName} label="priority" />
          <DropDownMenu items={categories} onSelectItem={handleSelectCategory} defaultLabel={category.categoryName} label="category" />
          <Text>Due Date: {formatDateToUI(dueDt)}</Text>
          <CalendarItem selectedDate={dueDt} setSelectedDate={handleSetDueDt} />
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
    <DataProvider>
      <EditTask taskId={taskId} category={category} priority={priority}/>
    </DataProvider>
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


