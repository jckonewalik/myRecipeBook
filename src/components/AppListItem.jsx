import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const AppListItem = ({ text, onRemove }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{text}</Text>
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
  itemText: {
    fontFamily: 'Roboto_400Regular',
    color: '#37426B',
    fontSize: 20,
  },
});

export default AppListItem;
