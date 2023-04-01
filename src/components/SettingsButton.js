import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import colors from '../constants/colors';
const SettingsButton = ({ onPress }) => (
  <TouchableOpacity
    testID="settingsButton"
    style={[
      {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 1,
        right: 10,
        marginTop: 30,
      },
    ]}
    onPress={onPress}
  >
    <View>
      <FontAwesome name="gear" size={30} color={colors.primaryColor} />
    </View>
  </TouchableOpacity>
);

export default SettingsButton;
