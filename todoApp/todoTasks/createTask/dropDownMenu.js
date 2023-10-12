import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export const DropDownMenu = ({items, onSelectItem, label}) => {
  const [selectedItem, setSelectedItem] = useState("")

  const handleItemChange = (value) => {
    setSelectedItem(value)
    onSelectItem(value)
  }
  const defaultLabelName= `Select ${label}`
  const labelName = `${label}Name`
  return(
    <View style={style.PickerStyle}>
      <Text style={{borderBottomWidth:1, padding:5}}>Select {label}</Text>
      <Picker style={{backgroundColor:"#d4d4d4"}}
      selectedValue={selectedItem}
      onValueChange={handleItemChange}
      
      >
        <Picker.Item label = {defaultLabelName} value="" />
        {items.map((item) => (
          <Picker.Item 
          key={item.id}
          label = {item[labelName]} 
          value = {item.id}
          />
        ))}

      </Picker>
    </View>
  )
}

const style = StyleSheet.create({
  PickerStyle:{
    borderWidth: 1,
    borderTopEndRadius:10,
    borderTopStartRadius:10,
    margin:10
  }
})