const router = require("express").Router();

const { Person, Dish } = require("../../db");

// make sure to use router.get, router.post etc..., instead of app.get, app.post, or etc... in this file.
// see https://expressjs.com/en/api.html#routers

router.get("/", (req, res, next) => {
  Person.findAll({
    include: [Dish],
    where: {
      attendence: true
    }
  })
    .then(people => res.send(people))
    .catch(next);
});
router.get("/", (req, res, next) => {
  Person.findAll({})
    .then(people => res.send(people))
    .catch(next);
});
router.get("/:id", (req, res, next) => {
  Person.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(person => res.send(person))
    .catch(next);
});
router.post("/", (req, res, next) => {
  Person.create(req.body)
    .then(() => Person.findAll())
    .then(people => res.send(people))
    .catch(next);
});
router.put("/:id", (req, res, next) => {
  Person.update({ ...req.body }, { where: { id: req.params.id } })
    .then(() => Person.findAll())
    .then(people => res.send(people))
    .catch(next);
});
router.delete("/:id", (req, res, next) => {
  Person.destroy({ where: { id: req.params.id } })
    .then(() => Person.findAll())
    .then(people => res.send(people))
    .catch(next);
});

module.exports = router;
