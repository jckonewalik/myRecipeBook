import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../constants/colors';
import { translate } from '../translations';
const { height } = Dimensions.get('window');
const AppImagePicker = ({ image, setImage }) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
              <Text style={styles.text}>{translate('select_image')}</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const border = {
  borderWidth: 1,
  borderColor: colors.primaryColor,
  borderStyle: 'dashed',
};
const styles = StyleSheet.create({
  mainContainer: {
    height: height * 0.4,
  },
  externalContainer: {
    backgroundColor: colors.grayColor,
    padding: 20,
    ...border,
  },
  internalContainer: {
    height: '100%',
    backgroundColor: colors.white,
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
    color: colors.primaryColor,
    fontFamily: 'Roboto_300Light',
    fontSize: 20,
  },
});

export default AppImagePicker;
