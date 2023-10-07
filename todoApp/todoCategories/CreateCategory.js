import React, {useState} from "react";
import { Button, TextInput, View, Text, StyleSheet } from "react-native";
import axios from "axios";
import { commonStyles } from "../../utils/styles";
import { getURL } from "../../utils/getURL";

 //const url = "https://taltech.akaver.com/api/v1/TodoCategories"
const url = getURL()

export const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("")
  const [serverResponse, setServerResponse] = useState("")
  const [isPostSuccesfull, setIsPostSuccesfull] = useState(false)
  const [succesfullResult, setsetSuccesulResult] = useState("");

  const [sortValue, setSortValue] = useState('')
  const [sortError, setSortError] = useState('')

  const handlePress = async() => {
    if(categoryName && sortValue){
      console.log("Started with response")
      try{

        const response = await axios.post(`${url}TodoCategories`,{
          categoryName: categoryName,
          categorySort: sortValue
        })
        setIsPostSuccesfull(true)
        setServerResponse("Succesfully added new category")
        setCategoryName("")
        setSortValue('')
      }catch(error){
        console.error("Error creating category", error)
        setIsPostSuccesfull(false)
        setServerResponse("Error creating new category")
      }

    }else{
      setIsPostSuccesfull(false)
      setServerResponse("Not all entries are valid")
    }
  }
  const handleSortChange = (text) => {
    // check if the input is numeric
    if(/^\d+$/.test(text)){
      setSortValue(text);
      setSortError('')
    }else{
      setSortValue('')
      setSortError('Please enter a numeric value')
    }
  }

  return(
    <View style={{borderBottomColor: 'black', borderBottomWidth:StyleSheet.hairlineWidth, marginBottom:10}}>
      <Text>Create new category</Text>
      <TextInput 
      style={styles.textInputStyle}
      placeholder="Category name"
      value={categoryName}
      onChangeText={setCategoryName}
      />
      <View style={{flexDirection:"row"}}>
        <Text style={{ flex:1, textAlign:"right",fontSize:20, textAlignVertical: 'center',}}>Sort: </Text>
        <TextInput 
        style={{flex:2, borderWidth:1, padding:5, fontSize:20, marginRight:10, borderRadius:10}}
        placeholder="Sort"
        value={sortValue}
        onChangeText={handleSortChange}
        keyboardType="numeric"
        />
      <Button style={{flex:2}}  title="Create new" onPress={handlePress}/>
      </View>
      <Text style={commonStyles.errorText} >{sortError}</Text>
      <Text style={{fontSize: 13, color: isPostSuccesfull ? 'green' : 'red'}} >{serverResponse}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  textInputStyle: {
    fontSize:18,
    borderRadius:10,
    padding:10,
    margin:10,
    borderWidth:1,
  }
})


