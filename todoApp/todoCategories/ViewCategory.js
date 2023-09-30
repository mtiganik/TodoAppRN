import { useState } from "react"
import { TextInput, TouchableOpacity } from "react-native"
import { commonStyles } from "../../utils/styles"
import axios from "axios";
import { GarbagePin } from "../../utils/SvgImages";
import { getURL } from "../../utils/getURL";

import EditCategory from "./EditCateGory";
const url = getURL()

export const ViewCategory = (category,setCategoryList) => {
  const [showContent, setShowContent] = useState(false)
  const [categoryDetails, setCategoryDetails] =useState({})
  const [fetchError, setFetchError] = useState("")

  useEffect(async() => {
    if(showContent){
      try {
        const categoryUrl = url + "/" + category.id
        const response = await axios.get(`${url}/TodoCategories/${category.id}`)
        setCategoryDetails(response.data)
      } catch (error) {
        setFetchError("Error retrieving data from server")
      }
    }
  },[showContent])

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
      <TouchableOpacity onPress={setShowContent(!showContent)}>
        {category.categoryName}
      </TouchableOpacity>
      <SvgXml 
            xml={GarbagePin}
            width={24}
            height={24}
            onPress={() => deleteCategory()}
          />
        <Text style={commonStyles.errorText} >{fetchError}</Text>
      {showContent &&
        <EditCategory category={categoryDetails} setCategoryList= {setCategoryList}/>
      }
      </View>
    )
  }


