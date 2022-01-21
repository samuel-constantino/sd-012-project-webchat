const connection = require('./connection');

const create = async (message) => {
    const db = await connection();

    const result = await db.collection('messages').insertOne({ message });
    
    return result;
};

const findAll = async () => {
    const db = await connection();

    const result = await db.collection('messages').find().toArray();
    
    return result;
};

module.exports = {
    create,
    findAll,
};