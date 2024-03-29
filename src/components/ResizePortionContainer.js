import React from 'react';

import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constants/colors';
import { translate } from '../translations';
import { fractionText, integerText } from '../utils/TextUtil';
const ResizePortionContainer = ({
  totalRecipes,
  onPressMinus,
  onPressPlus,
}) => (
  <View style={styles.resizeContainer}>
    <TouchableOpacity testID="decreaseRecipeQuantity" onPress={onPressMinus}>
      <FontAwesome name="minus" size={24} color={colors.primaryColor} />
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
      <Text style={styles.resizePortionsDescription}>
        {translate('recipe')}
      </Text>
    </View>
    <TouchableOpacity testID="increaseRecipeQuantity" onPress={onPressPlus}>
      <FontAwesome name="plus" size={24} color={colors.primaryColor} />
    </TouchableOpacity>
  </View>
);

const fontBold = {
  color: colors.primaryColor,
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
