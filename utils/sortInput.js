import { useState } from "react";
import { commonStyles } from "./styles";
import { View, TextInput, Text } from "react-native";

export const SortInput = ({ sortValue, setSortValue, defaultValue = null }) => {
  const [sortError, setSortError] = useState("")

  const handleSortChange = (text) => {
    if (/^\d+$/.test(text)) {
      setSortValue(text);
      setSortError('')
    } else {
      setSortValue('')
      setSortError('Please enter a numeric value')
    }
  }

  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ flex: 1, textAlign: "right", fontSize: 20, textAlignVertical: 'center', }}>Sort: </Text>

      <TextInput
        style={{ flex: 2, borderWidth: 1, padding: 5, fontSize: 20, marginRight: 10, borderRadius: 10 }}
        placeholder={defaultValue ? defaultValue.toString(): "Sort"}
        value={sortValue.toString()}
        onChangeText={handleSortChange}
        keyboardType="numeric"
      />
      <Text style={commonStyles.errorText}>{sortError}</Text>
    </View>
  )
}
