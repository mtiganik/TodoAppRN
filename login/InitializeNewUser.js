import axios from "axios"
import uuid from "react-native-uuid";

const userID = uuid.v4()

const uuidWorkCategory = uuid.v4()
const uuidSchoolCategory = uuid.v4()
const uuidHomeCategory = uuid.v4()

const DefaultCategories = [
{
  id: uuidWorkCategory,
  categoryName: "Work",
  categorySort: 0

}, 
{
  id: uuidSchoolCategory,
  categoryName: "School",
  categorySort: 1
},
{
  id: uuidHomeCategory,
  categoryName: "Home",
  categorySort: 2
}
]

const uuidHighPriority = uuid.v4()
const uuidMediumPriority = uuid.v4()
const uuidLowPriority = uuid.v4()

const DefaultPriorities = [
  {
    id:uuidHighPriority,
    appUserId: userID,
    priorityName: "High",
    prioritySort: 1,
    syncDt: new Date()
  },
  {
    id:uuidMediumPriority,
    appUserId: userID,
    priorityName: "Medium",
    prioritySort: 2,
    syncDt: new Date()
  },
  {
    id:uuidLowPriority,
    appUserId: userID,
    priorityName: "Low",
    prioritySort: 2,
    syncDt: new Date()
  }
]

const defaultListItems = [
  {
  id:uuid.v4(),
  description: "Pet the Dog",
  completed: false
},{
  id:uuid.v4(),
  description: "Go to gym",
  completed: false
},
{
  id:uuid.v4(),
  description: "Make dinner",
  completed: true
}
]

const datetimeNow = new Date();
const dateTime2WeeksFromNow = datetimeNow.setDate(datetimeNow.getDate() + 14)

const defaultTodoTasks = [
  {
    id: uuid.v4(),
    taskName: "Pet the dog",
    taskSort: 0,
    createdDt: datetimeNow,
    dueDt: dateTime2WeeksFromNow,
    isCompleted: false,
    isArchived: false,
    todoCategoryId: uuidHomeCategory,
    todoPriorityId: uuidMediumPriority,
    syncDt: datetimeNow
  },
  {
    id: uuid.v4(),
    taskName: "Make dinner",
    taskSort: 0,
    createdDt: datetimeNow,
    dueDt: dateTime2WeeksFromNow,
    isCompleted: true,
    isArchived: true,
    todoCategoryId: uuidHomeCategory,
    todoPriorityId: uuidLowPriority,
    syncDt: datetimeNow
  },
  {
    id: uuid.v4(),
    taskName: "Buy flowers for gf",
    taskSort: 0,
    createdDt: datetimeNow,
    dueDt: dateTime2WeeksFromNow,
    isCompleted: true,
    isArchived: true,
    todoCategoryId: uuidHomeCategory,
    todoPriorityId: uuidMediumPriority,
    syncDt: datetimeNow
  },

  {
    id: uuid.v4(),
    taskName: "Tell manager you want higher salary",
    taskSort: 0,
    createdDt: datetimeNow,
    dueDt: dateTime2WeeksFromNow,
    isCompleted: true,
    isArchived: false,
    todoCategoryId: uuidWorkCategory,
    todoPriorityId: uuidHighPriority,
    syncDt: datetimeNow
  },
  {
    id: uuid.v4(),
    taskName: "Ask questions from Mr. Kever",
    taskSort: 0,
    createdDt: datetimeNow,
    dueDt: dateTime2WeeksFromNow,
    isCompleted: false,
    isArchived: false,
    todoCategoryId: uuidSchoolCategory,
    todoPriorityId: uuidMediumPriority,
    syncDt: datetimeNow

  }
]


const url = "https://taltech.akaver.com/api/v1/"
export default InitializeNewUser = async(token) => {
  // axios.defaults.headers.common['Authorization'] = 'Bearer ' + responseData.token

  console.log("Start of InitializeNewUser")
  try{
    const response = await axios.post(`${url}TodoCategories`,DefaultCategories)
    console.log("Response:" , response.data)
  }catch(error){
    console.log("Error:", error)
  }

}