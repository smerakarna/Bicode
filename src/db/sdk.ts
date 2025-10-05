import type { Collection, Document, InsertOneResult, WithId } from 'mongodb';

type User = {
    id: string;
    email: string;
    // REQUIRED: https://www.youtube.com/shorts/G38Bj1Lt-0E
    // https://www.youtube.com/watch?v=jmtzX-NPFDc
    passwordHash: string;
}

export const findUsers = (collection: Collection<Document>, userFilter: Partial<User>): Promise<WithId<Document>[]> => {
    return collection.find(userFilter).toArray()
}

export const insertUser = (collection: Collection<Document>, user: User): Promise<InsertOneResult<Document>> => {
    return collection.insertOne(user);
}