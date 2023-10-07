import { useState, useEffect } from "react";
import axios from "axios";
import { ViewCategory } from "./ViewCategory";
import { TouchableOpacity } from "react-native"
import { getURL } from "../../utils/getURL";
import { getToken } from "../../context/UserContext";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { commonStyles } from "../../utils/styles";
const url = getURL() + "TodoCategories"

export const ListCategory = () => {
  const [error, setError] = useState("")
  const [categoryList, setCategoryList] = useState([])

  useEffect( () => {
    const fetchData = async() => {
      try{
        const response = await axios.get(url)
        setCategoryList(response.data)
        setError("")

      }catch(error){
        console.log("Error occured: " + error)
        setError("Error retrieving data from server")
      }
    }
    fetchData();
  }, []);

  return (
    <View>
      <Text style={myStyle.textStyle}>Todo categories</Text>
      {categoryList.length > 0 &&
          (
            <ScrollView>
          {categoryList.map(category => (
            <ViewCategory key={category.id} category={category} setCategoryList={setCategoryList} />
          ))}
        </ScrollView>
          )
      }
      <Text style={commonStyles.errorText} >{error}</Text>
    </View>
  )
}


const myStyle = StyleSheet.create({
  textStyle: {
    textAlign: 'center',
    fontSize: 20,
    padding:10,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 10,
},

});
