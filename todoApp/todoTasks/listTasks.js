import { View, ScrollView, Button, Text, StyleSheet } from "react-native";
import { commonStyles } from "../../utils/styles";
import { ViewTask } from "./viewTask";
import { useDataContext } from "../../context/DataContext";

export const ListTask = () => {
  const {tasks, setTasks, categories, priorities, error} = useDataContext();
  function mapById(array){
    return array.reduce((acc, obj) =>{
      acc[obj.id] = obj;
      return acc;
    }, {});
  }

  const categoryMap = mapById(categories);
  const priorityMap = mapById(priorities);
  console.log("tasks: ", tasks)
  return(
    <View > 
      {tasks &&
        (
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {tasks.map(task => (

          <ViewTask key={task.id} 
          task={task} 
          category={categoryMap[task.todoCategoryId]}
          priority={priorityMap[task.todoPriorityId]}
          setTasks={setTasks}/>
        ))}
      </ScrollView>
        )
      }
      <Text style={commonStyles.errorText} >{error}</Text>
  </View>
  )
}

const styles = StyleSheet.create({
  scrollViewContent:{
    paddingBottom: 150
  }
})