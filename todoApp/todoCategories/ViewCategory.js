import { useState, useEffect } from "react"
import { TextInput, TouchableOpacity, View, Text } from "react-native"
import { SvgXml } from "react-native-svg";
import { GarbagePin, ShowPassword, ErrorSign, CheckSign } from "../../utils/SvgImages";
import { commonStyles } from "../../utils/styles"
import axios from "axios";
import { getURL } from "../../utils/getURL";

import EditCategory from "./EditCategory";
const url = getURL()

export const ViewCategory = ({category,setCategoryList}) => {
  const [showContent, setShowContent] = useState(false)
  const [categoryDetails, setCategoryDetails] =useState({})
  const [fetchError, setFetchError] = useState("")

  // console.log(categoryDetails)
  useEffect(() => {
    const fetchCategoryDetails = async() => {
      try {
        const response = await axios.get(`${url}/TodoCategories/${category.id}`)
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
      const response = await axios.delete(`${url}/TodoCategories/${category.id}`)
      setCategoryList((prevCategories) => 
      prevCategories.filter((cat) => cat.id !== category.id))
    }catch(error){
      setFetchError(error)
    }

  }

    return (
      <View>
      <TouchableOpacity onPress={() => setShowContent(!showContent)}>
        {/* <TouchableOpacity> */}
          <Text>

        {category.categoryName}
        </Text>

      </TouchableOpacity>
      <SvgXml 
            xml={GarbagePin}
            width={24}
            height={24}
            onPress={() => deleteCategory()}
          />

        <Text style={commonStyles.errorText} >{fetchError}</Text>
      {showContent && categoryDetails &&
        <EditCategory category={categoryDetails} setCategoryList= {setCategoryList}/>
      }
      </View>
    )
  }


