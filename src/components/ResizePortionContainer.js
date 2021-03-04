import React from 'react';

import { FontAwesome } from '@expo/vector-icons';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { integerText, fractionText } from '../utils/TextUtil';

import i18n from 'i18n-js';

const ResizePortionContainer = ({
  totalRecipes,
  onPressMinus,
  onPressPlus,
}) => (
  <View style={styles.resizeContainer}>
    <TouchableOpacity onPress={onPressMinus}>
      <FontAwesome name="minus" size={24} color="#37426B" />
    </TouchableOpacity>
    <View style={styles.resizePortionsContainer}>
      <View style={styles.resizePortionsNumberContainer}>
        <Text style={styles.resizePortionsIntegerAmount}>
          {integerText(totalRecipes)}
        </Text>
        <Text style={styles.resizePortionsFractionAmount}>
          {fractionText(totalRecipes)}
        </Text>
      </View>
      <Text style={styles.resizePortionsDescription}>{i18n.t('recipe')}</Text>
    </View>
    <TouchableOpacity onPress={onPressPlus}>
      <FontAwesome name="plus" size={24} color="#37426B" />
    </TouchableOpacity>
  </View>
);

const fontBold = {
  color: '#37426B',
  fontFamily: 'Roboto_900Black',
  fontSize: 20,
};
const styles = StyleSheet.create({
  resizeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E3EAEE',
    paddingVertical: 10,
  },
  resizePortionsContainer: {
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resizePortionsNumberContainer: {
    flexDirection: 'row',
  },
  resizePortionsIntegerAmount: {
    ...fontBold,
    fontSize: 30,
  },
  resizePortionsFractionAmount: {
    ...fontBold,
    fontSize: 15,
  },
  resizePortionsDescription: {
    ...fontBold,
    fontSize: 12,
  },
});

export default ResizePortionContainer;
