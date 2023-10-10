import { useState } from "react";
import { View, Text } from "react-native";
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
    <View>
      <Text>Select {label}</Text>
      <Picker
      selectedValue={selectedItem}
      onValueChange={handleItemChange}
      >
        <Picker.Item label = {labelName} value=""/>
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