import { resetDatabase } from '../database/repository/__mocks__/RecipesRepository';
jest.mock('../database/repository/RecipesRepository');
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

beforeEach(() => {
  resetDatabase();
});
