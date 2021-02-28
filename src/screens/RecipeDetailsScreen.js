import React, { useContext, useRef } from 'react';
import { Context } from '../contexts/Recipes/RecipesContext';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { integerText, fractionText } from '../utils/TextUtil';
import {
  SafeAreaView,
  View,
  Animated,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
  PanResponder,
} from 'react-native';
import i18n from 'i18n-js';

const { height, width } = Dimensions.get('window');

const RecipeDetailsScreen = ({ navigation }) => {
  const position = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureHandler) => {
        return true;
      },
      onPanResponderGrant: () => {
        position.setOffset({
          x: position.x._value,
          y: position.y._value,
        });
      },
      onPanResponderMove: (event, gestureHandler) => {
        position.setValue({
          y: gestureHandler.dy,
          x: 0,
        });
      },
      onPanResponderRelease: () => {
        const open = position.y._value < -height * 0.1;
        position.flattenOffset();
        Animated.spring(position, {
          toValue: { y: open ? -height * 0.4 : 0, x: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;
  const getCardStyle = () => {
    const translateY = position.y.interpolate({
      inputRange: [-height, 0, height],
      outputRange: [-height, 0, 10],
      extrapolate: 'clamp',
    });
    return {
      transform: [{ translateY }],
      ...styles.detailsContainer,
    };
  };
  const { state, increaseFractionation, decreaseFractionation } = useContext(
    Context
  );
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          zIndex: 1,
          marginLeft: 20,
          marginTop: 30,
        }}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="keyboard-backspace" size={30} color="#37426B" />
      </TouchableOpacity>
      <Image
        style={styles.thumb}
        source={{ uri: state.selectedRecipe.imageUrl }}
      />
      <Animated.View style={getCardStyle()} {...panResponder.panHandlers}>
        <View style={styles.detailsHeader}>
          <Text style={styles.recipeTitle}>{state.selectedRecipe.title}</Text>
          <Text
            style={styles.recipePortions}
          >{`${state.selectedRecipe.portions} ${state.selectedRecipe.portionUnit}`}</Text>
        </View>
        <View style={styles.resizeContainer}>
          <TouchableOpacity onPress={decreaseFractionation}>
            <FontAwesome name="minus" size={24} color="#37426B" />
          </TouchableOpacity>
          <View style={styles.resizePortionsContainer}>
            <View style={styles.resizePortionsNumberContainer}>
              <Text style={styles.resizePortionsIntegerAmount}>
                {integerText(state.totalRecipes)}
              </Text>
              <Text style={styles.resizePortionsFractionAmount}>
                {fractionText(state.totalRecipes)}
              </Text>
            </View>
            <Text style={styles.resizePortionsDescription}>
              {i18n.t('recipe')}
            </Text>
          </View>
          <TouchableOpacity onPress={increaseFractionation}>
            <FontAwesome name="plus" size={24} color="#37426B" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingHorizontal: 30,
          }}
        >
          {Object.keys(state.selectedRecipe.steps).map((key) => (
            <Step
              key={key}
              stepName={key}
              totalRecipes={state.totalRecipes}
              ingredients={state.selectedRecipe.steps[key].ingredients}
            />
          ))}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const Step = ({ stepName, ingredients = [], totalRecipes }) => {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={styles.steps}>{stepName}</Text>
      {ingredients.map((ingredient) => (
        <View key={ingredient.ingredient} style={styles.ingredientsContainer}>
          <Text style={styles.ingredients}>
            {integerText(ingredient.amount * totalRecipes)}
          </Text>
          <Text style={{ ...styles.ingredients, fontSize: 10 }}>
            {fractionText(ingredient.amount * totalRecipes)}
          </Text>
          <Text style={styles.ingredients}>
            {` ${ingredient.unit} - ${ingredient.ingredient}`}
          </Text>
        </View>
      ))}
    </View>
  );
};

const fontBold = {
  color: '#37426B',
  fontFamily: 'Roboto_900Black',
  fontSize: 20,
};

const styles = StyleSheet.create({
  droidSafeArea: {
    position: 'relative',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 35 : 0,
  },
  thumb: {
    resizeMode: 'cover',
    height: height * 0.5,
  },
  detailsContainer: {
    height: height,
    width: width,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff',
  },
  detailsHeader: {
    marginTop: 30,
    paddingHorizontal: 30,
  },
  recipeTitle: {
    ...fontBold,
  },
  recipePortions: {
    color: '#7895A1',
    fontFamily: 'Roboto_900Black',
    fontSize: 15,
    marginTop: 10,
  },
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
  resizePortionsNumberContainer: {
    flexDirection: 'row',
  },
  resizePortionsContainer: {
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
  steps: {
    ...fontBold,
    fontFamily: 'Roboto_400Regular',
    fontSize: 18,
  },
  ingredientsContainer: {
    flexDirection: 'row',
  },
  ingredients: {
    marginTop: 10,
    fontFamily: 'Roboto_400Regular',
    color: '#7895A1',
    fontSize: 15,
  },
});

export default RecipeDetailsScreen;
