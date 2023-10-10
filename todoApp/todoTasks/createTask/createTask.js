import { View, Text, TextInput } from "react-native"
import { useState } from "react";
import { useDataContext } from "../../../context/DataContext"
import { PriorityDropDown } from "./priorityDropDown";
import { DropDownMenu } from "./dropDownMenu";

export const CreateTask = () => {
  // const {priorities, categories} = useDataContext();
  const [selectedPriorityId, setSelectedPriorityId] = useState("")

  const priorities = [
    { id: '1', priorityName: 'High' },
    { id: '2', priorityName: 'Medium' },
    { id: '3', priorityName: 'Low' },
    // Add your priorities here
  ];

  const handleSelectPriority = (priorityId) => {
    setSelectedPriorityId(priorityId)
  }

  return(
    <View>

      <Text>In create new Todo</Text>
      {/* <TextInput 
      style={styles.textInputStyle}
      placeholder="Category name"
      value={categoryName}
      onChangeText={setCategoryName}
      />
              <TextInput 
        style={{flex:2, borderWidth:1, padding:5, fontSize:20, marginRight:10, borderRadius:10}}
        placeholder="Sort"
        value={sortValue}
        onChangeText={handleSortChange}
        keyboardType="numeric"
        /> */}

        <PriorityDropDown priorities={priorities} onSelectPriority={handleSelectPriority} />
        <DropDownMenu items = {priorities} onSelectItem={handleSelectPriority} label="priority"/>

    </View>
  )
}