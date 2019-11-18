const { app } = require("./app");
const PORT = 3000;
const { db, Person, Dish } = require("../db");

async function syncAndSeedDatabase() {
  try {
    await db.sync({ force: true });
    //  Create some rows in your Person and Dish tables here
    //  to interact with your API using the `npm run start:watch`
    //  or `npm run start` commands.
    const people = [
      { name: "moe", attendence: true },
      { name: "larry", attendence: true },
      { name: "joe", attendence: false },
      { name: "john", attendence: true }
    ];
    const [moe, larry, joe, john] = await Promise.all(
      people.map(person => Person.create(person))
    );
    const dishes = [
      { name: "wild rice salad", description: "appetizer", personId: moe.id },
      { name: "pumpkin soup", description: "appetizer", personId: larry.id },
      { name: "turkey", description: "main course", personId: john.id },
      {
        name: "corn casserole",
        description: "main course",
        personId: larry.id
      },
      { name: "cranberry sauce", description: "side dish", personId: larry.id },
      { name: "bread rolls", description: "side dish", personId: moe.id },

      { name: "pumpkin cake", description: "dessert", personId: john.id }
    ];
    await Promise.all(dishes.map(dish => Dish.create(dish)));
  } catch (e) {
    console.log(e);
  }

  console.log("done seeding and associating!");
}

syncAndSeedDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
});
