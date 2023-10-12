import { View, Text, TextInput, StyleSheet } from "react-native"
import { useState } from "react";
// import { PriorityDropDown } from "./priorityDropDown";
import { DropDownMenu } from "./dropDownMenu";
import { SortInput } from "../../../utils/sortInput";
import { commonStyles } from "../../../utils/styles";
import { useDataContext } from "../../../context/DataContext"
import { DataProvider } from "../../../context/DataContext";

export const CreateTask = () => {
  const {tasks, setTasks, categories, priorities, error} = useDataContext();
  const [selectedPriorityId, setSelectedPriorityId] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [taskName, setTaskName] = useState("")
  const [sortValue, setSortValue] = useState("")
  const priorities2 = [
    { id: '1', priorityName: 'High' },
    { id: '2', priorityName: 'Medium' },
    { id: '3', priorityName: 'Low' },
    // Add your priorities here
  ];

  const handleSelectPriority = (priorityId) => {
    setSelectedPriorityId(priorityId)
  }

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId)
  }

  return(
    <View>

      <Text>Create new Todo</Text>
      <TextInput 
      style={styles.textInputStyle}
      placeholder="Task name"
      value={taskName}
      onChangeText={setTaskName}
      />

    <SortInput sortValue={sortValue} setSortValue={setSortValue}/>

        <DropDownMenu items = {priorities} onSelectItem={handleSelectPriority} label="priority"/>
        <DropDownMenu items = {categories} onSelectItem={handleSelectCategory} label="category"/>

    </View>
  )
}

export const CreateTaskWrapper = () => {

  return (
    <DataProvider>
      <CreateTask />
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


