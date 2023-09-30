import { useState } from "react";
import axios from "axios";
import { ViewCategory } from "./ViewCategory";
import { TouchableOpacity } from "react-native"
import { getURL } from "../../utils/getURL";

const url = getURL() + "TodoCategories"

export const ListCategory = () => {

  const [categoryList, setCategoryList] = useState({})
  const [error, setError] = useState("")

  useEffect( () => {
    const fetchData = async() => {
      try{
        const response = await axios.get(url)
        setCategoryList(response.data)

      }catch(error){
        setError("Error retrieving data from server")
      }
    }
  },[categoryList]);
  return (
    <View>
      <Text>Todo categories</Text>
      {categoryList.length > 0 &&
        <View>
          (
          {categoryList.map(category => (
            <ViewCategory key={category.id} category={category} setCategoryList={setCategoryList} />
          ))}
          )
        </View>
      }
    </View>
  )
}

