import db from '../Connection';

export const createTable = () => {
  db.execSync(
    'create table if not exists recipes (id integer primary key not null, imageUrl text, title text, portions numeric, portionUnit text, calories numeric, multiSteps bit, steps text);'
  );
  recipes = db.getAllSync('PRAGMA table_info(recipes)');
  const hasMultiSteps = !!recipes.find((f) => f.name === 'multiSteps');
  if (!hasMultiSteps) {
    db.execSync('alter table recipes add column multiSteps bit');
  }
};

export const listAll = async () => {
  return db.getAllAsync(
    'select id, imageUrl, title, portions, portionUnit, calories from recipes order by title'
  );
};

export const findById = async (id) => {
  let row = await db.getFirstAsync('select * from recipes where id = ?', id);
  row.steps = JSON.parse(row.steps);
  row.multiSteps = row.multiSteps === 'true';
  return row;
};

export const getAllRecipes = async () => {
  const rows = await db.getAllAsync(
    'select title, portions, portionUnit, calories, multiSteps, steps from recipes'
  );
  return rows.map((r) => {
    return {
      ...r,
      steps: JSON.parse(r.steps),
      multiSteps: r.multiSteps === 'true',
    };
  });
};

export const insert = async ({
  imageUrl,
  title,
  portions,
  portionUnit,
  calories,
  multiSteps,
  steps,
}) => {
  return db.runAsync(
    'insert into recipes (imageUrl, title, portions, portionUnit, calories, multiSteps, steps) values (?, ?, ?, ?, ?, ?, ?)',
    imageUrl,
    title,
    portions,
    portionUnit,
    calories,
    multiSteps,
    JSON.stringify(steps)
  );
};

export const update = ({
  id,
  imageUrl,
  title,
  portions,
  portionUnit,
  calories,
  steps,
}) => {
  return db.runAsync(
    'update recipes set imageUrl=?, title=?, portions=?, portionUnit=?, calories=?, steps=? where id=?',

    imageUrl,
    title,
    portions,
    portionUnit,
    calories,
    JSON.stringify(steps),
    id
  );
};

export const remove = async ({ id }) => {
  return db.runAsync('delete from recipes where id = ?', id);
};
