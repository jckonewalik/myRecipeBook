import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { translate } from '../translations';
const SearchBar = ({ onSearch }) => {
  let timeout = null;

  const setSearchValue = (text) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function () {
      onSearch(text);
    }, 1000);
  };

  return (
    <View style={styles.inputContainer} testID="searchBarComponent">
      <TextInput
        testID="searchText"
        onChangeText={setSearchValue}
        placeholder={translate('search')}
      />
      <FontAwesome
        style={styles.icon}
        name="search"
        size={20}
        color="#C9C9C9"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#C9C9C9',
    paddingVertical: 10,
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    right: 0,
    bottom: 10,
  },
});

export default SearchBar;
