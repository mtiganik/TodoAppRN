import { useState, useEffect } from "react"
import { View, Button, TextInput, Text } from "react-native"
import axios from "axios"
import { getURL } from "../../utils/getURL"
import { commonStyles } from "../../utils/styles"

const url = getURL()

export default EditCategory = ({inputCategory, setCategoryList}) => {
  const [error, setError] = useState("")
  // const [categoryName, setCategoryName] = useState(category.categoryName)
  // const [categorySort, setCategorySort] = useState(category.categorySort)
  const [category, setCategory] = useState({})
  console.log(inputCategory)
  useEffect(() => {
    setCategory(inputCategory)
  }, [inputCategory])

  console.log(category.categoryName)

  const handleEdit = async() => {
    try{
      const response = axios.put(`${url}TodoCategories/${category.id}`,{
        categoryName: category.categoryName,
        categorySort: category.categorySort
      })

      setCategoryList((prevCategories) =>
        prevCategories.map((cat) =>
          cat.id === category.id
            ? {
              ...cat,
              categoryName: category.categoryName,
              categorySort: category.categorySort
            }
            : cat
        )
      )
    } catch (error) {
      setError("Error editing category")
    }
  }

  const handleCategoryNameChange = (newCategoryName) => {
    setCategory({...category, categoryName: newCategoryName})
  }

  const handleCategorySortChange = (newCategorySort) => {
    setCategory({...category, categorySort: newCategorySort})
  }
  return(
    <View>
      <TextInput 
      value={category.categoryName} 
      onChangeText={handleCategoryNameChange}
      />
      <Text>Sort:</Text>
      <TextInput 
      keyboardtype="numeric" 
      value={category.categorySort} 
      onChangeText={handleCategorySortChange}
      />
      <Button 
      title="Edit"
      onPress = {handleEdit}
      />
      <Text style={commonStyles.errorText}>{error}</Text>
    </View>
  )
}