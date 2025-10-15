import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('recipe.db');

export default db;
