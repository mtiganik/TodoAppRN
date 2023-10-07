import { useState, useEffect } from "react"
import { getURL } from "../../utils/getURL";
import { View, ScrollView, Button, Text, StyleSheet } from "react-native";
import { commonStyles } from "../../utils/styles";
import axios from "axios";


const url = getURL()

export const ViewTask = ({task, setTaskList}) => {


  return(
    <View style={styles.container}>
      <Text>{task.taskName}</Text>
      <Text>Category name here</Text>
      <Text>Priority name here</Text>

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