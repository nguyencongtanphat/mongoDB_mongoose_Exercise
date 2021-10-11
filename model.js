const mongoose = require('mongoose');
const { Schema } = mongoose;
const personSchema = new Schema ({ 
    name: { type: 'string', require: true},
    age: { type: 'number'},
    favoriteFoods : [String]
});
module.exports = personSchema
