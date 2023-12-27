import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { WarningSign } from "../../utils/SvgImages";


export const DisplayPriority = ({priority}) => {
  let textColor = 'black'; 

  if (priority.prioritySort <= 2){
    textColor = 'green';
  }else if(priority.prioritySort >= 3 && priority.prioritySort <= 5){
    textColor = 'orange';
  }else if (priority.prioritySort >= 6){
    textColor = "darkred"
  }
  return (
    <View style={{flexDirection:"row"}}>
      <Text>Priority </Text>
      {priority.prioritySort >= 6 && (
        <SvgXml
          xml={WarningSign}
          width={15}
          height={15}
        />
      )}
      <Text style={{color:textColor, fontWeight:"bold"}}>{priority.priorityName}</Text>
    </View>
)
}
