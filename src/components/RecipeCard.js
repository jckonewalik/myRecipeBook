import React, { useRef, useState } from 'react';
import i18n from 'i18n-js';
import {
  Animated,
  PanResponder,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import colors from '../constants/colors';
import { FontAwesome } from '@expo/vector-icons';
import noImage from '../../assets/no-image.png';
import { TouchableOpacity } from 'react-native-gesture-handler';

const RecipeCard = ({ recipe, onSelect, onEdit, onDelete }) => {
  const [openned, setOpenned] = useState(false);
  const image = recipe.imageUrl ? { uri: recipe.imageUrl } : noImage;
  const position = useRef(new Animated.ValueXY()).current;
  const openCardOptions = () => {
    position.flattenOffset();
    Animated.spring(position, {
      toValue: { x: openned ? 0 : -250, y: 0 },
      useNativeDriver: false,
    }).start();
    setOpenned(!openned);
  };
  const getCardStyle = () => {
    const translateX = position.x.interpolate({
      inputRange: [-500, 0, 500],
      outputRange: [-200, 0, 5],
      extrapolate: 'clamp',
    });
    return {
      flex: 1,
      transform: [{ translateX }],
      flexDirection: 'row',
      width: '100%',
    };
  };
  return (
    <View testID="recipeCard" style={styles.cardContainer}>
      <Animated.View style={getCardStyle()}>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <TouchableWithoutFeedback
            testID="selectRecipeButton"
            onPress={() => onSelect(recipe.id)}
          >
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <View style={styles.imageContainer}>
                <Image source={image} style={styles.image} />
              </View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.title}>{recipe.title}</Text>
                <Text style={styles.subTitle}>{`${recipe.portions} ${i18n.t(
                  recipe.portionUnit
                )}`}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableOpacity onPress={openCardOptions}>
            <View style={styles.menuContainer}>
              <FontAwesome name="ellipsis-v" size={20} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            testID="editRecipeButton"
            onPress={() => onEdit(recipe.id)}
          >
            <View style={styles.editContainer}>
              <FontAwesome name="pencil" size={24} color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            testID="deleteRecipeButton"
            onPress={() => onDelete(recipe.id, recipe.imageUrl)}
          >
            <View style={styles.deleteContainer}>
              <FontAwesome name="trash" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.5,
    marginVertical: 10,
  },
  descriptionContainer: {
    marginVertical: 10,
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: colors.primaryColor,
    fontFamily: 'Roboto_900Black',
  },
  subTitle: {
    marginTop: 10,
    fontSize: 15,
    color: '#7895A1',
    fontFamily: 'Roboto_900Black',
  },
  imageContainer: {
    marginRight: 20,
    marginVertical: 10,
    marginLeft: 10,
  },
  image: {
    height: 100,
    width: 100,
  },
  optionsContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  deleteContainer: {
    backgroundColor: '#c40000',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: '100%',
  },
  editContainer: {
    backgroundColor: '#2ab300',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: '100%',
  },
  menuContainer: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RecipeCard;
