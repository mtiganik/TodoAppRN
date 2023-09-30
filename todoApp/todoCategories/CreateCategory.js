import React, {useState} from "react";
import { Button, TextInput, View } from "react-native";
import axios from "axios";

const url = "https://taltech.akaver.com/api/v1/TodoCategories"


export const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("")
  const [response, setResponse] = useState("")
  const handlePress = async() => {
    try{
      const guid = crypto.randomUUID()
      console.log(guid)
      const categorySort = Math.floor(Math.random() * 100)

      const response = await axios.post(url,{
        id: guid,
        categoryName: categoryName,
        categorySort: categorySort
      })
      const responseData = response.data
      
    }
  }

  return(
    <View>
      <Text>Create new category</Text>
      <TextInput 
      placeholder="Category name"
      value={categoryName}
      onChangeText={setCategoryName}
      />
      <Button title="Create" onPress={handlePress}/>
    </View>
  )
}