import { View, Text, TextInput, StyleSheet, Button, ScrollView } from "react-native"
import { useState } from "react";
// import { PriorityDropDown } from "./priorityDropDown";
import { DropDownMenu } from "./dropDownMenu";
import { SortInput } from "../../../utils/sortInput";
import { commonStyles } from "../../../utils/styles";
import { useDataContext } from "../../../context/DataContext"
import { DataProvider } from "../../../context/DataContext";
import { CalendarItem } from "../../../utils/calendarItem";
import axios from "axios";
import { getURL } from "../../../utils/getURL";
// import {`[Calendar](#calendar), [CalendarList](#calendarlist), [Agenda](#agenda)`} from 'react-native-calendars';

const url = getURL();

export const CreateTask = ({navigation}) => {
  const {tasks, setTasks, categories, priorities, error} = useDataContext();
  const [selectedPriorityId, setSelectedPriorityId] = useState("")
  const [selectedCategoryId, setSelectedCategoryId] = useState("")
  const [taskName, setTaskName] = useState("")
  const [sortValue, setSortValue] = useState("")
  const [taskError, setTaskError] = useState("")
  const [selectedDate, setSelectedDate] = useState();


  const handleSelectPriority = (priorityId) => {
    setSelectedPriorityId(priorityId)
  }

  const handleSelectCategory = (categoryId) => {
    setSelectedCategoryId(categoryId)
  }

  const handleSubmitNewTask = async() => {
    try{
      const response = await axios.post(`${url}TodoTasks`, {
        taskName: taskName,
        dueDt: selectedDate,
        taskSort: sortValue,
        todoCategoryId: selectedCategoryId,
        todoPriorityId: selectedPriorityId
      })

      const backToHome = "Succesfully created new Task" 
      navigation.navigate("Home", {successMessage: backToHome})

    }catch(error){
      console.error("Error occured in createTask: ", error)
      setTaskError("Error creating new Task")
    }
  }

  return(
    <ScrollView>

      <Text>Create new Todo</Text>
      <TextInput
        style={styles.textInputStyle}
        placeholder="Task name"
        value={taskName}
        onChangeText={setTaskName}
      />
      <SortInput sortValue={sortValue} setSortValue={setSortValue} />
      <DropDownMenu items={priorities} onSelectItem={handleSelectPriority} label="priority" />
      <DropDownMenu items={categories} onSelectItem={handleSelectCategory} label="category" />

      <CalendarItem selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <Text>{selectedDate}</Text>
      <Button title="Submit" onPress={handleSubmitNewTask} />
      <Text style={commonStyles.errorText}>{error}</Text>
      <Text style={commonStyles.errorText}>{taskError}</Text>
    </ScrollView>
  )
}

export const CreateTaskWrapper = ({navigation}) => {

  return (
    <DataProvider>
      <CreateTask navigation={navigation}/>
    </DataProvider>
  )
}

const styles = StyleSheet.create({
  textInputStyle: {
    fontSize:18,
    borderRadius:10,
    padding:10,
    margin:10,
    borderWidth:1,
  }
})


