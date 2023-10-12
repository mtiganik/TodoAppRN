import { View, Text, Button } from "react-native"
import { Calendar } from "react-native-calendars"
import { useState } from "react"

export const CalendarItem = ({selectedDate, setSelectedDate}) => {
  const [isCalendarVisible, setCalendarVisible] = useState(false)


  const openCalendar = () => {
    setCalendarVisible(true)
  }

  const closeCalendar = () => {
    setCalendarVisible(false)
  }
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString)
  }

  return (
    <View>
      <Button title="Due date" onPress={openCalendar} />
      {isCalendarVisible && (
        <View>
          <Calendar
            onDayPress={(day) => {
              handleDayPress(day);
              closeCalendar();
            }}
            markedDates={{
              [selectedDate]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: 'orange',
              },
            }}
          />
          <Button title="OK" onPress={closeCalendar} />
        </View>
      )}

    </View>

  )
}