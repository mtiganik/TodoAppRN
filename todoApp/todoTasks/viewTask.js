import { useState, useEffect } from "react"
import { getURL } from "../../utils/getURL";
import { View, ScrollView, Button, Text, StyleSheet } from "react-native";
import { commonStyles } from "../../utils/styles";
import axios from "axios";


const url = getURL()

export const ViewTask = ({task, category, priority, setTasks}) => {

  return(
    <View style={styles.container}>
      <Text>{task.taskName}</Text>
      <Text>Category: {category.categoryName}</Text>
      <Text>Priority: {priority.priorityName}</Text>

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