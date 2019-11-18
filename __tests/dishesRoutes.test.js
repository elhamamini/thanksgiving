// tests for /api/dishes

// supertest is a module that allows us to test our express server
const request = require("supertest");
const { app } = require("./../server/app.js");
const { db, Dish, Person } = require("./../db/index.js");

beforeEach(async done => {
  // wipe the db before each test block
  await db.sync({ force: true });
  done();
});
afterAll(async done => {
  // close the db connection upon completion of all tests
  await db.close();
  done();
});
describe("/api/dishes routes", () => {
  // its up to you to create the test conditions for /api/dishes
  // add as many tests as you feel necessary to fully cover each routes functionality
  const dish1 = { name: "turkey", description: "delicious briney turkey" };
  const dish2 = { name: "pie", description: "delicious pumpkiney pie" };
  const dish3 = { name: "salad", description: "delicious wildrice salad" };
  describe("GET to /api/dishes", () => {
    it("it should return all the dishes!", () => {
      return Promise.all([Dish.create(dish1), Dish.create(dish2)]).then(() => {
        return request(app)
          .get("/api/dishes")
          .expect("Content-type", /json/)
          .expect(200)
          .then(response => {
            const dishes = response.body;
            expect(dishes.length).toBe(2);
            expect(dishes).toEqual(
              expect.arrayContaining([
                expect.objectContaining(dish1),
                expect.objectContaining(dish2)
              ])
            );
          })
          .catch(err => {
            fail(err);
          });
      });
    });

    describe("GET to /api/dishes/:id", () => {
      it("does a test!", async () => {
        try {
          await Promise.all([
            Dish.create(dish1),
            Dish.create(dish2),
            Dish.create(dish3)
          ]);
          await request(app)
            .get("/api/dishes/1")
            .expect("Content-type", /json/)
            .expect(200);
        } catch (err) {
          fail(err);
        }
      });
    });

    describe("POST to /api/dishes/", () => {
      it("does a test!", async () => {
        try {
          const dish = {
            name: "turkey",
            description: "main dish"
          };
          // const addNewDish = await request(app).post("/api/dishes");
          // expect(addNewDish.statusCode).toBe(200);
          // expect(addNewDish.headers["content-type"]).toEqual(
          //   expect.stringContaining("json")
          // );

          await request(app)
            .post("/api/dishes")
            .send(dish)
            .expect("Content-Type", /json/)
            .expect(200);
        } catch (err) {
          fail(err);
        }
      });
    });

    describe("PUT to /api/dishes/:id", () => {
      it("does a test!", async () => {
        try {
          const dish = {
            name: "turkey",
            description: "main dish"
          };
          await request(app)
            .post("/api/dishes")
            .send(dish);

          await request(app)
            .put("/api/dishes/1")
            .send({ name: "cold turkey" })
            .expect("Content-Type", /json/)
            .expect(200);
        } catch (err) {
          fail(err);
        }

        // PUT edits something
        // TODO:
        //  find dish with id of req.params.id
        //  edit it in the database
        //  decide what we send back to the front end
      });
    });

    describe("DELETE to /api/dishes/:id", () => {
      it("should remove dish ", async () => {
        try {
          await Promise.all([
            Dish.create(dish1),
            Dish.create(dish2),
            Dish.create(dish3)
          ]);
          await request(app)
            .get("/api/dishes")
            .expect("Content-type", /json/)
            .expect(200);
          await request(app)
            .delete("/api/dishes/1")
            .expect(200);
        } catch (err) {
          fail(err);
        }
      });
    });
  });
});
