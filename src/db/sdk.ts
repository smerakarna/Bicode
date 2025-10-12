import { Db, Document, InsertOneResult } from "mongodb";

type User = {
  email: string;
  // REQUIRED: https://www.youtube.com/shorts/G38Bj1Lt-0E
  // https://www.youtube.com/watch?v=jmtzX-NPFDc
  passwordHash: string;
};

export const findUsers = (db: Db, userFilter: Partial<User>) => {
  return db.collection("users").find(userFilter).toArray();
};

export const insertUser = (db: Db, user: User) => {
  return db.collection("users").insertOne(user);
};
