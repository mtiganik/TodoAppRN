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

const DefaultListItems = [
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

const DefaultTodoTasks = [
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
export const InitializeNewUser = async(token) => {
  // axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

  console.log("Start of InitializeNewUser")
  console.log(JSON.stringify(DefaultListItems))
  console.log(`${url}TodoCategories`)
  try{
    //DefaultCategories.map(async(a) => await axios.post(`${url}TodoCategories`,a))
    //DefaultPriorities.map(async(a) => await axios.post(`${url}TodoPriorities`,a))
    DefaultListItems.map(async(a)=> await axios.post(`${url}ListItems`,a))
    //DefaultTodoTasks.map(async(a)=> await axios.post(`${url}TodoTasks`,a))
    console.log("End of Initializing new user data")
    // for(var a in DefaultCategories){
    //   console.log("Element " , a)
    //   await axios.post(`${url}TodoCategories`,a)
    // }
    // console.log("Response:" , response.data)
  }catch(error){
    console.log("Error:", error)
  }

}

export const TestAxiosFetch = async() => {
  console.log(DefaultListItems)

  try{
    const response = await axios.get(`${url}TodoTasks`)
    console.log(response.data)
  }catch(error){
    console.log(JSON.stringify(error))
  }
}