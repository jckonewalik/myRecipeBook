import React, { useContext, useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  PanResponder,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DetailsTabView from '../components/DetailsTabView';
import ResizePortionContainer from '../components/ResizePortionContainer';
import colors from '../constants/colors';
import { Context } from '../contexts/Recipes/RecipesContext';
import { translate } from '../translations';
const { height } = Dimensions.get('window');

const RecipeDetailsScreen = ({ route }) => {
  const { recipeId } = route.params;

  const position = useRef(new Animated.ValueXY({ x: 0, y: -(height * 0.04) }))
    .current;
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
        const open = position.y._value < -(height * 0.15);
        position.flattenOffset();
        Animated.spring(position, {
          toValue: { y: open ? -(height * 0.39) : -(height * 0.04), x: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;
  const getCardStyle = () => {
    const translateY = position.y.interpolate({
      inputRange: [-height, 0, height],
      outputRange: [-height, 0, height * 0.01],
      extrapolate: 'clamp',
    });
    return {
      transform: [{ translateY }],
    };
  };
  const {
    state,
    loadRecipe,
    increaseRecipeSize,
    decreaseRecipeSize,
    recipeRepository,
  } = useContext(Context);

  useEffect(() => {
    recipeRepository.findById(recipeId, loadRecipe);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {state.loadingRecipe ? (
        <View
          style={{
            flex: 1,
            backgroundColor: colors.white,
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <ActivityIndicator size="large" color={colors.primaryColor} />
        </View>
      ) : (
        <>
          {state.selectedRecipe.imageUrl ? (
            <Image
              style={styles.thumb}
              source={{ uri: state.selectedRecipe.imageUrl }}
            />
          ) : (
            <View style={styles.noThumb}>
              <Image source={require('../../assets/no-image.png')} />
            </View>
          )}
          <Animated.View style={[getCardStyle(), styles.detailsContainer]}>
            <Animated.View
              style={styles.detailsHeader}
              {...panResponder.panHandlers}
            >
              <Text style={styles.recipeTitle}>
                {state.selectedRecipe.title}
              </Text>
              <Text style={styles.recipePortions}>{`${
                state.selectedRecipe.portions * state.totalRecipes
              } ${translate(state.selectedRecipe.portionUnit)}`}</Text>
            </Animated.View>
            <ResizePortionContainer
              totalRecipes={state.totalRecipes}
              onPressMinus={decreaseRecipeSize}
              onPressPlus={increaseRecipeSize}
            />
            <DetailsTabView
              recipe={state.selectedRecipe}
              totalRecipes={state.totalRecipes}
            />
          </Animated.View>
        </>
      )}
    </SafeAreaView>
  );
};

const fontBold = {
  color: colors.primaryColor,
  fontFamily: 'Roboto_900Black',
  fontSize: 20,
};

const styles = StyleSheet.create({
  thumb: {
    resizeMode: 'cover',
    height: height * 0.5,
  },
  noThumb: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.5,
  },
  detailsContainer: {
    height: height * 0.8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.white,
    shadowColor: '#555',
    shadowRadius: 15,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.8,
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
});

export default RecipeDetailsScreen;
