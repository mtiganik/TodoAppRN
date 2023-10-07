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
    priorityName: "High",
    prioritySort: 6,
  },
  {
    id: uuidMediumPriority,
    appUserId: userID,
    priorityName: "Medium",
    prioritySort: 4,
  },
  {
    id: uuidLowPriority,
    priorityName: "Low",
    prioritySort: 2,
  }
]


const datetimeNow = new Date();
const dateTime2WeeksFromNow = new Date(datetimeNow)
dateTime2WeeksFromNow.setDate(datetimeNow.getDate() + 14)

const DefaultTodoTasks = [
  {
    taskName: "Pet the dog",
    taskSort: 0,
    dueDt: dateTime2WeeksFromNow.toISOString(),
    todoCategoryId: uuidHomeCategory,
    todoPriorityId: uuidMediumPriority,
  },
  {
    taskName: "Make dinner",
    taskSort: 0,
    dueDt: dateTime2WeeksFromNow.toISOString(),
    todoCategoryId: uuidHomeCategory,
    todoPriorityId: uuidLowPriority,
  },
  {
    taskName: "Read book",
    taskSort: 0,
    dueDt: dateTime2WeeksFromNow.toISOString(),
    todoCategoryId: uuidHomeCategory,
    todoPriorityId: uuidMediumPriority,
  },

  {
    taskName: "Tell manager you want higher salary",
    taskSort: 0,
    dueDt: dateTime2WeeksFromNow.toISOString(),
    todoCategoryId: uuidWorkCategory,
    todoPriorityId: uuidHighPriority,
  },
  {
    taskName: "Ask questions from Mr. Kever",
    taskSort: 0,
    dueDt: dateTime2WeeksFromNow.toISOString(),
    todoCategoryId: uuidSchoolCategory,
    todoPriorityId: uuidMediumPriority,
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

