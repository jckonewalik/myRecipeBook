import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('recipe.db');

export default db;
