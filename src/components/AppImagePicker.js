import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import i18n from 'i18n-js';
const { height } = Dimensions.get('window');
const AppImagePicker = ({ image, setImage }) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    } else {
      setImage(null);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        ) : (
          <View style={styles.externalContainer}>
            <View style={styles.internalContainer}>
              <Text style={styles.text}>{i18n.t('select_image')}</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const border = {
  borderWidth: 1,
  borderColor: '#37426B',
  borderStyle: 'dashed',
};
const styles = StyleSheet.create({
  mainContainer: {
    height: height * 0.4,
  },
  externalContainer: {
    backgroundColor: '#DEDEDE',
    padding: 20,
    ...border,
  },
  internalContainer: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    ...border,
  },
  imageContainer: {
    ...border,
  },
  image: {
    height: '100%',
    resizeMode: 'cover',
  },
  text: {
    color: '#37426B',
    fontFamily: 'Roboto_300Light',
    fontSize: 20,
  },
});

export default AppImagePicker;
