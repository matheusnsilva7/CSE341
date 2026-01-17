const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=["Users"]
  const result = await mongodb.getDatabase().db().collection("users").find();
  result.toArray().then((users) => {
    res.setHeader("content-type", "application/json");
    res.status(200).json(users);
  });
};

const getOne = async (req, res) => {
  //#swagger.tags=["Users"]
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .find({ _id: userId });
  result.toArray().then((users) => {
    res.setHeader("content-type", "application/json");
    res.status(200).json(users[0]);
  });
};

const createContact = async (req, res) => {
  //#swagger.tags=["Users"]
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };

  const reponse = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .insertOne(contact);

  if (reponse.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(reponse.error || "Some error occurred while updating the contact");
  }
};

const updateContact = async (req, res) => {
  //#swagger.tags=["Users"]
  const userId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };

  const reponse = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .replaceOne({ _id: userId }, contact);

  if (reponse.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(reponse.error || "Some error occurred while updating the contact");
  }
};

const deleteContact = async (req, res) => {
  //#swagger.tags=["Users"]
  const userId = new ObjectId(req.params.id);

  const reponse = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .deleteOne({ _id: userId });

  if (reponse.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(reponse.error || "Some error occurred while updating the contact");
  }
};

module.exports = {
  getAll,
  getOne,
  createContact,
  updateContact,
  deleteContact,
};
