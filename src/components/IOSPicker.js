import React, { useState } from 'react';
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
import i18n from 'i18n-js';

const { height } = Dimensions.get('window');

const IOSPicker = ({ testID, label, outputValue, options, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pickerValue, setPickerValue] = useState(`${i18n.t('select')}`);
  let localeOutputValue = i18n.t(outputValue);
  localeOutputValue = localeOutputValue.includes('missing')
    ? outputValue
    : localeOutputValue;

  const onModalSelect = () => {
    if (pickerValue !== `${i18n.t('select')}`) {
      onSelect(pickerValue);
      setModalVisible(false);
    }
  };

  const onModalCancel = () => {
    setModalVisible(false);
  };
  return (
    <>
      <TouchableOpacity
        testID={`${testID}ModalPress`}
        onPress={() => setModalVisible(true)}
      >
        <View>
          <AppOutputText
            testID={`${testID}Output`}
            label={label}
            value={localeOutputValue}
          />
        </View>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <TouchableWithoutFeedback onPress={onModalCancel}>
          <View style={styles.headerModalContainer} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <View style={styles.modalOptions}>
            <TouchableOpacity onPress={onModalCancel}>
              <Text style={styles.pickerOptions}>{i18n.t('cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID={`${testID}Select`}
              onPress={onModalSelect}
            >
              <Text style={styles.pickerOptions}>{i18n.t('select')}</Text>
            </TouchableOpacity>
          </View>
          <Picker
            testID={`${testID}`}
            selectedValue={pickerValue}
            onValueChange={(itemValue) => setPickerValue(itemValue)}
          >
            <Picker.Item label={i18n.t('select')} value={i18n.t('select')} />
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
    borderBottomWidth: 0.5,
    padding: 18,
  },
  pickerOptions: {
    fontFamily: 'Roboto_900Black',
  },
});

export default IOSPicker;
