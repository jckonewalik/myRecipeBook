import React, { useContext, useRef } from 'react';
import { Context } from '../contexts/Recipes/RecipesContext';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
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
import ResizePortionContainer from '../components/ResizePortionContainer';
import DetailsTabView from '../components/DetailsTabView';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('window');

const RecipeDetailsScreen = ({ navigation }) => {
  const position = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureHandler) => {
        return position.y._value !== 0 ? false : true;
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
  const openSettings = () => {
    navigation.navigate('Settings');
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
      <TouchableOpacity
        style={{
          position: 'absolute',
          zIndex: 1,
          right: 20,
          marginTop: 30,
        }}
        onPress={openSettings}
      >
        <View>
          <FontAwesome name="gear" size={34} color="#37426B" />
        </View>
      </TouchableOpacity>
      <TouchableWithoutFeedback
        onPress={() => {
          Animated.spring(position, {
            toValue: { y: 0, x: 0 },
            useNativeDriver: false,
          }).start();
        }}
      >
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
      </TouchableWithoutFeedback>
      <Animated.View style={getCardStyle()} {...panResponder.panHandlers}>
        <View style={styles.detailsHeader}>
          <Text style={styles.recipeTitle}>{state.selectedRecipe.title}</Text>
          <Text style={styles.recipePortions}>{`${
            state.selectedRecipe.portions * state.totalRecipes
          } ${state.selectedRecipe.portionUnit}`}</Text>
        </View>
        <ResizePortionContainer
          totalRecipes={state.totalRecipes}
          onPressMinus={decreaseFractionation}
          onPressPlus={increaseFractionation}
        />
        <DetailsTabView
          recipe={state.selectedRecipe}
          totalRecipes={state.totalRecipes}
        />
      </Animated.View>
    </SafeAreaView>
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
  noThumb: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.5,
  },
  detailsContainer: {
    height: height * 0.9,
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
});

export default RecipeDetailsScreen;
