import { useState, useEffect } from "react";
import axios from "axios";
import { ViewCategory } from "./ViewCategory";
import { TouchableOpacity } from "react-native"
import { getURL } from "../../utils/getURL";
import { getToken } from "../../context/UserContext";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import { commonStyles } from "../../utils/styles";
import { CreateCategory } from "./CreateCategory";
const url = getURL() + "TodoCategories"

export const ListCategory = () => {
  const [error, setError] = useState("")
  const [categoryList, setCategoryList] = useState([])
  const [showCreateCategory, setShowCreateCategory] = useState(false)

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

  const toggleCreateCategory = () => {
    setShowCreateCategory(!showCreateCategory)
  }
  return (
    <View>
      <View style={myStyle.header} >
      <Text style={myStyle.textStyle}>Todo categories</Text>
      <Button title={showCreateCategory ? "Hide create" : "Create"} onPress={toggleCreateCategory} />
      </View>
      {showCreateCategory && <CreateCategory setCategoryList={setCategoryList}/> }


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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding:10,
    backgroundColor: '#fff'
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 10,
},

});
