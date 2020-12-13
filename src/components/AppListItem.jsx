import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { limitText } from '../utils/TextUtil';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const AppListItem = ({ text, onRemove, style, textLimit = 25 }) => {
  return (
    <View style={styles.item}>
      <View style={styles.textContainer}>
        <Text style={{ ...styles.itemText, ...style }}>
          {limitText(text, textLimit)}
        </Text>
      </View>
      <TouchableOpacity onPress={() => onRemove(text)}>
        <FontAwesome name="trash" size={32} color="#C20D0D" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    width: width * 0.8,
    overflow: 'hidden',
    flexWrap: 'nowrap',
  },
  itemText: {
    fontFamily: 'Roboto_400Regular',
    color: '#37426B',
    fontSize: 20,
  },
});

export default AppListItem;
