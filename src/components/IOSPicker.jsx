import React, { useEffect, useState } from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AppOutputText from '../components/AppOutputText';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const { height } = Dimensions.get('window');

const IOSPicker = ({ label, outputValue, options, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pickerValue, setPickerValue] = useState('Selecione');

  const onModalSelect = () => {
    if (pickerValue !== 'Selecione') {
      onSelect(pickerValue);
      setModalVisible(false);
    }
  };

  const onModalCancel = () => {
    setModalVisible(false);
  };
  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View>
          <AppOutputText label={label} value={outputValue} />
        </View>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <TouchableWithoutFeedback onPress={onModalCancel}>
          <View style={styles.headerModalContainer} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <View style={styles.modalOptions}>
            <TouchableOpacity onPress={onModalCancel}>
              <Text style={styles.pickerOptions}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onModalSelect}>
              <Text style={styles.pickerOptions}>Selecionar</Text>
            </TouchableOpacity>
          </View>
          <Picker
            selectedValue={pickerValue}
            onValueChange={(itemValue) => setPickerValue(itemValue)}
          >
            <Picker.Item label="Selecione" value="Selecione" />
            {options.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  headerModalContainer: {
    height: height * 0.6,
  },
  modalContainer: {
    backgroundColor: '#ddd',
    elevation: 5,
  },
  modalOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    padding: 18,
  },
  pickerOptions: {
    fontFamily: 'Roboto_900Black',
  },
});

export default IOSPicker;
