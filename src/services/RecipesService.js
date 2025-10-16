import { File, Directory, Paths } from 'expo-file-system';
import {
  insert,
  update,
  remove,
} from '../database/repository/RecipesRepository';
export const saveOrUpdate = async ({
  id,
  imageUrl,
  title,
  portions,
  portionUnit,
  calories,
  multiSteps,
  steps,
}) => {
  try {
    let newFile;
    if (imageUrl) {
      const filePath = imageUrl.split('/');
      const fileName = filePath[filePath.length - 1];
      const originalFile = new File(imageUrl);
      newFile = new File(`${Paths.document.uri}${fileName}`);
      if (imageUrl !== newFile.uri) {
        originalFile.copy(newFile);
      }
    }

    if (id) {
      update({
        id,
        imageUrl: newFile?.uri,
        title,
        portions,
        portionUnit,
        calories,
        steps,
      });
    } else {
      insert({
        imageUrl: newFile?.uri,
        title,
        portions,
        portionUnit,
        calories,
        multiSteps,
        steps,
      });
    }
  } catch (err) {
    console.error('Error trying to save the recipe.', err);
  }
};

export const deleteRecipe = async ({ id, imageUrl }) => {
  try {
    if (imageUrl) {
      try {
        const file = new File(imageUrl);
        file.delete();
      } catch (e) {}
    }

    await remove({
      id,
    });
  } catch (err) {
    console.error('Error trying to delete the recipe.', err);
  }
};
