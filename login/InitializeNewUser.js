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
    id: uuidHighPriority,
    appUserId: userID,
    priorityName: "High",
    prioritySort: 1,
    syncDt: new Date()
  },
  {
    id: uuidMediumPriority,
    appUserId: userID,
    priorityName: "Medium",
    prioritySort: 2,
    syncDt: new Date()
  },
  {
    id: uuidLowPriority,
    appUserId: userID,
    priorityName: "Low",
    prioritySort: 2,
    syncDt: new Date()
  }
]

// Don't have Api Key, don't know what to do with these
const DefaultListItems = [
  {
    id: uuid.v4(),
    description: "Pet the Dog",
    completed: false
  }, {
    id: uuid.v4(),
    description: "Go to gym",
    completed: false
  },
  {
    id: uuid.v4(),
    description: "Make dinner",
    completed: true
  }
]

const datetimeNow = new Date();
const dateTime2WeeksFromNow = new Date(datetimeNow)
dateTime2WeeksFromNow.setDate(datetimeNow.getDate() + 14)

const DefaultTodoTasks = [
  {
    id: uuid.v4(),
    taskName: "Pet the dog",
    taskSort: 0,
    createdDt: datetimeNow.toISOString(),
    dueDt: dateTime2WeeksFromNow.toISOString(),
    isCompleted: false,
    isArchived: false,
    todoCategoryId: uuidHomeCategory,
    todoPriorityId: uuidMediumPriority,
    syncDt: datetimeNow.toISOString()
  },
  {
    id: uuid.v4(),
    taskName: "Make dinner",
    taskSort: 0,
    createdDt: datetimeNow.toISOString(),
    dueDt: dateTime2WeeksFromNow.toISOString(),
    isCompleted: true,
    isArchived: true,
    todoCategoryId: uuidHomeCategory,
    todoPriorityId: uuidLowPriority,
    syncDt: datetimeNow.toISOString()
  },
  {
    id: uuid.v4(),
    taskName: "Buy flowers for gf",
    taskSort: 0,
    createdDt: datetimeNow.toISOString(),
    dueDt: dateTime2WeeksFromNow.toISOString(),
    isCompleted: true,
    isArchived: true,
    todoCategoryId: uuidHomeCategory,
    todoPriorityId: uuidMediumPriority,
    syncDt: datetimeNow.toISOString()
  },

  {
    id: uuid.v4(),
    taskName: "Tell manager you want higher salary",
    taskSort: 0,
    createdDt: datetimeNow.toISOString(),
    dueDt: dateTime2WeeksFromNow.toISOString(),
    isCompleted: true,
    isArchived: false,
    todoCategoryId: uuidWorkCategory,
    todoPriorityId: uuidHighPriority,
    syncDt: datetimeNow.toISOString()
  },
  {
    id: uuid.v4(),
    taskName: "Ask questions from Mr. Kever",
    taskSort: 0,
    createdDt: datetimeNow.toISOString(),
    dueDt: dateTime2WeeksFromNow.toISOString(),
    isCompleted: false,
    isArchived: false,
    todoCategoryId: uuidSchoolCategory,
    todoPriorityId: uuidMediumPriority,
    syncDt: datetimeNow.toISOString()

  }
]


const url = "https://taltech.akaver.com/api/v1/"

export default InitializeNewUser = async () => {


  try {
    await Promise.all(
      DefaultCategories.map(async (category) => {
        try {
          await axios.post(`${url}TodoCategories`, category)

        } catch (categoryError) {
          console.error("Error creating category:", categoryError.message)
        }}),

      DefaultPriorities.map(async (priority) => {
        try {
          await axios.post(`${url}TodoPriorities`, priority)

        } catch (priorityError) {
          console.error("Error creating priority: ", priorityError.message)
        }
      })
    )

    console.log("Created Categories and Priorities Initial Values")
  } catch (error) {
    console.log(error.message)
  }

  console.log("Start of initializing some todos")

  try{
    await Promise.all(
      DefaultTodoTasks.map(async (task) => {
        try {
          await axios.post(`${url}TodoTasks`, task)

        } catch (taskError) {
          if (taskError.response) {
            console.error("Task creation failed with status code:", taskError.response.status);
            console.error("Error response data:", taskError.response.data);
          }
          console.error("Error creating tasks: ", taskError.message)
        }})

    )
    console.log("Created Todo Tasks Initial Values")
  }catch(promiseError){
    console.error("Error initializing tasks: ", promiseError)
  }
}

