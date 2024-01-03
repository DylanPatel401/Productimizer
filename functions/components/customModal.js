import { Modal, Text, View, TouchableOpacity} from 'react-native';
import { barHeight } from './../../styles/style.js';
import { AntDesign } from '@expo/vector-icons'; 

const CustomModal = ({ visiblility, headerText, leftBtnTxt, rightBtnTxt, leftBtnFunction, rightBtnFunction}) => {

  return(
    <Modal
      visible={visiblility}
      animationType="slide"
      transparent={true}
    >
    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center' }}>
      <View style={{ backgroundColor: 'rgba(0,0,0,0.8)', padding: 16, borderRadius: 8, margin: 16 }}>
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 18, marginBottom: 16 }}>
          {headerText}
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            style={{ backgroundColor: 'rgba(255,255,255,0.3)', padding: 12, borderRadius: 8, flex: 1, marginRight: barHeight }}
            onPress={leftBtnFunction}
          >
            <Text style={{ textAlign: 'center', color: 'white', fontSize: barHeight/1.5 }}>
              {leftBtnTxt}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ backgroundColor: 'rgba(255,255,255,0.3)', padding: 12, borderRadius: 8, flex: 1, marginLeft: barHeight }}
            onPress={rightBtnFunction}
          >
            <Text style={{ textAlign: 'center', color: 'white', fontSize: barHeight/1.5 }}>
              {rightBtnTxt}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
  );
}

export {CustomModal}