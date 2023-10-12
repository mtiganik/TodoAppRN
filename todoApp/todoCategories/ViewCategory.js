import { useState, useEffect } from "react"
import { TextInput, TouchableOpacity, View, Text, StyleSheet } from "react-native"
import { SvgXml } from "react-native-svg";
import { GarbagePin, ShowPassword, ErrorSign, CheckSign } from "../../utils/SvgImages";
import { commonStyles } from "../../utils/styles"
// import axios from "axios";
import { getURL } from "../../utils/getURL";
import api from "../../utils/refreshToken";

import EditCategory from "./EditCategory";
const url = getURL()

export const ViewCategory = ({category,setCategoryList}) => {
  const [showContent, setShowContent] = useState(false)
  const [categoryDetails, setCategoryDetails] =useState({})
  const [fetchError, setFetchError] = useState("")

  useEffect(() => {
    const fetchCategoryDetails = async() => {
      try {
        const response = await axios.get(`${url}TodoCategories/${category.id}`)
        setCategoryDetails(response.data)
      } catch (error) {
        setFetchError("Error retrieving data from server")
      }

    }
    if(showContent){
      fetchCategoryDetails()
    }
  },[])

  const deleteCategory = async() => {
    try{

      const response = await api.delete(`${url}TodoCategories/${category.id}`)
      

      setCategoryList((prevCategories) => 
      prevCategories.filter((cat) => cat.id !== category.id))
    }catch(error){
      setFetchError(error)
    }
  }

    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={() => setShowContent(!showContent)} 
        style={[styles.clickableArea, showContent && styles.expandedArea]}
>
        <Text style={styles.categoryName}>{category.categoryName}</Text>

        <SvgXml
          xml={GarbagePin}
          width={24}
          height={24}
          onPress={() => deleteCategory()}
          
        />
        </TouchableOpacity>

        {showContent && categoryDetails &&
          <EditCategory inputCategory={categoryDetails} setCategoryList={setCategoryList} />
        }
        <Text style={commonStyles.errorText} >{fetchError}</Text>
      </View>
    )
  }


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c9c9c9',
    borderWidth: 2,
    borderRadius: 10,
    margin: 5,
  },
  clickableArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor:"gray"
  },
  expandedArea: {
    flex: 1,
    paddingHorizontal: 10,
  },
  categoryName: {
    flex: 6, // Takes 6x space
    fontSize:16,
  },
});
