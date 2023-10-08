import { useState, useEffect } from "react"
import { getURL } from "../../utils/getURL";
import { View, ScrollView, Button, Text, StyleSheet } from "react-native";
import { commonStyles } from "../../utils/styles";
import axios from "axios";


import { SvgXml } from "react-native-svg";
import { WarningSign } from "../../utils/SvgImages";

import {DisplayPriority} from "./displayPriority";

const url = getURL()

export const ViewTask = ({task, category, priority, setTasks}) => {


  return(
    <View style={styles.container}>
      <Text>{task.taskName}</Text>
      <Text>Category: {category.categoryName}</Text>

      <DisplayPriority priority = {priority}/>

    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    borderWidth:1,
    borderRadius:5,
    padding:5,
    margin:5
  }
})