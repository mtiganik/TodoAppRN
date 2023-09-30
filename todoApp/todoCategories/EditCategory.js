import { useState } from "react"
import { View, Button, TextInput } from "react-native"
import axios from "axios"
import { getURL } from "../../utils/getURL"

const url = getURL()

export default EditCategory = (category, setCategoryList) => {
  const [error, setError] = useState("")
  const [categoryName, setCategoryName] = useState(category.categoryName)
  const [categorySort, setCategorySort] = useState(category.categorySort)

  const handleEdit = async() => {
    try{
      const response = axios.put(`${url}/TodoCategories/${category.id}`,{
        categoryName: categoryName,
        categorySort: categorySort
      })

      setCategoryList((prevCategories) =>
        prevCategories.map((cat) =>
          cat.id === category.id
            ? {
              ...cat,
              categoryName: categoryName,
              categorySort: categorySort
            }
            : cat
        )
      )
    } catch (error) {
      setError("Error editing category")
    }
  }
  return(
    <View>
      <TextInput 
      value={categoryName} 
      onChange={setCategoryName}
      />
      <Text>Sort:</Text>
      <TextInput 
      keyboardtype="numeric" 
      value={category.categorySort} 
      onChange={setCategorySort}/>
      <Button 
      title="Edit"
      onPress = {handleEdit}
      />
      <Text style={commonStyles.errorText}>{error}</Text>
    </View>
  )
}