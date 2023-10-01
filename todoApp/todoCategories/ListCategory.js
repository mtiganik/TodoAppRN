import { useState, useEffect } from "react";
import axios from "axios";
import { ViewCategory } from "./ViewCategory";
import { TouchableOpacity } from "react-native"
import { getURL } from "../../utils/getURL";
import { getToken } from "../../context/UserContext";
import { View, Text } from "react-native";
import { commonStyles } from "../../utils/styles";

const url = getURL() + "TodoCategories"

export const ListCategory = () => {
  const [error, setError] = useState("")

  const [categoryList, setCategoryList] = useState([])


  
  useEffect( () => {
    const fetchData = async() => {
      try{
        const response = await axios.get(url)
        console.log(response.data) // This works 

        setCategoryList(response.data)
        console.log(categoryList) // This does not work
        setError("")

      }catch(error){
        console.log("Error occured: " + error)
        setError("Error retrieving data from server")
      }
    }
    fetchData();
  }, [categoryList]);

  return (
    <View>
      <Text>Todo categories123</Text>
      {categoryList.length > 0 &&
          (
            <View>
          {categoryList.map(category => (
            <Text key={category.id}> {category.categoryName} </Text>
            // <ViewCategory key={category.id} category={category} setCategoryList={setCategoryList} />
          ))}
        </View>
          )
      }
      <Text style={commonStyles.errorText} >error</Text>
    </View>
  )
}

