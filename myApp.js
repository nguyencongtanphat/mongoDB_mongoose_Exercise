require('dotenv').config();
const personSchema = require('./model')
const mongoose = require('mongoose');
const { response } = require('express');

//connect mongoose to Mongoose

mongoose.connect('mongodb+srv://Phat:140419@cluster0.i3wth.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(() => {
      console.log('connect successful')
  })
  .catch(err => console.log('connect failed'))


let Person;

Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let Meo = new Person({
    name:'Phat',
    age:19,
    favoriteFoods:['chicken, fish, meat, fruit']
  });
  Meo.save(function (err,data) {
    if(err) return console.log('err:', err)
    done(null, data);
  })
};
//array of instance people
const arrayOfPeople = [
  {
    name:'Phat',
    age:19,
    favoriteFoods:['chicken, fish, meat, fruit']
  },
  {
    name:'My',
    age:19,
    favoriteFoods:['chicken, fish, meat, fruit']
  },
  {
    name:'Minh',
    age:19,
    favoriteFoods:['chicken, fish, meat, fruit']
  }
]


const createManyPeople = (arrayOfPeople, done) => {
  // Person.create(arrayOfPeople, (err, people) => {
  //     if(err) return console.log(err)
  //     done(null , people);
  // })
  Person.create(arrayOfPeople)
    .then((people) =>{
        done(null , people)
    })
    .catch((err) =>{
        console.log(err)
    })
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName})
    .then((people) =>{
      done(null, people);
    })
    .catch((err) =>{
        console.log(err)
    })
  
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods : food})
    .then(people => {
        done(null, people);
    })
    .catch((err) =>{
        console.log(err)
    })
};

const findPersonById = (personId, done) => {
  Person.findById({_id : personId})
  .then(people => {
    done(null, people);
  })
  .catch((err) =>{
      console.log(err)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId)
    .then((person) =>{
        person.favoriteFoods.push(foodToAdd)
        person.save()
          .then((updatePerson) =>{
            done(null, updatePerson );
          })
          .catch((err) =>{
            console.log(err)
          })
    })
    .catch((err) =>{
        console.log(err)
    })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName},{age : ageToSet}, {new : true})
    .then(updatePerson =>{
        done(null, updatePerson);
    })
    .catch(err =>{
        console.log(err);
    })
  
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId)
    .then(removePerson =>{
      done(null, removePerson);
    })
    .catch(err =>{
      console.log(err);
    })
  
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods : foodToSearch})
    .sort({name : -1})
    .limit(2)
    .select({age : 0})
    .exec(function(error, people) {
      if(error) return console.error(error);
      done(null , people);
    });
 
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
