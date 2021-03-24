export const createTable = () => {};
export const dropTable = () => {};

export const listAll = (setList, callback) => {
  const recipes = [
    {
      id: 1,
      title: 'Recipe 1',
      imageUrl: 'image1.png',
      portions: 10,
      portionUnit: 'unit',
    },
    {
      id: 2,
      title: 'Recipe 2',
      imageUrl: 'image2.png',
      portions: 10,
      portionUnit: 'unit',
    },
    {
      id: 3,
      title: 'Recipe 3',
      imageUrl: 'image3.png',
      portions: 10,
      portionUnit: 'unit',
    },
  ];
  setList(recipes);
  callback && callback();
};

export const findById = (id, loadRecipe, callback) => {};

export const insert = ({
  imageUrl,
  title,
  portions,
  portionUnit,
  calories,
  steps,
}) => {};

export const update = ({
  id,
  imageUrl,
  title,
  portions,
  portionUnit,
  calories,
  steps,
}) => {};

export const remove = ({ id }) => {};
