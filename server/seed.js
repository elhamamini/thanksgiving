const { app } = require("./app");

// const { db } = require("./connection");

// const { Dish } = require("./models/Dish");
// const { Person } = require("./models/Person");
// Dish.belongsTo(Person);
// Person.hasMany(Dish);
// const syncAndSeed = async () => {
//   await db.sync({ force: true });
//   const people = [
//     { name: "moe", attendence: true },
//     { name: "larry", attendence: true },
//     { name: "joe", attendence: false },
//     { name: "john", attendence: true }
//   ];
//   const [moe, larry, joe, john] = await Promise.all(
//     people.map(person => Person.create(person))
//   );
//   const dishes = [
//     { name: "wild rice salad", description: "appetizer", personId: moe.id },
//     { name: "pumpkin soup", description: "appetizer", personId: larry.id },
//     { name: "turkey", description: "main course", personId: john.id },
//     { name: "corn casserole", description: "main course", personId: larry.id },
//     { name: "cranberry sauce", description: "side dish", personId: larry.id },
//     { name: "bread rolls", description: "side dish", personId: moe.id },

//     { name: "pumpkin cake", description: "dessert", personId: john.id }
//   ];
//   const [
//     salad,
//     soup,
//     turkey,
//     casserole,
//     sause,
//     braed,
//     cake
//   ] = await Promise.all(dishes.map(dish => Dish.create(dish)));
// };

// // Create your associations here!

// module.exports = {
//   db,
//   Dish,
//   Person
// };
