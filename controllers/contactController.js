const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=["Contacts"]
  const result = await mongodb.getDatabase().db().collection("Contacts").find();
  result.toArray().then((Contacts) => {
    res.setHeader("content-type", "application/json");
    res.status(200).json(Contacts);
  });
};

const getOne = async (req, res) => {
  //#swagger.tags=["Contacts"]
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("Contacts")
    .find({ _id: contactId });
  result.toArray().then((Contacts) => {
    res.setHeader("content-type", "application/json");
    res.status(200).json(Contacts[0]);
  });
};

const createContact = async (req, res) => {
  //#swagger.tags=["Contacts"]
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
    .collection("Contacts")
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
  //#swagger.tags=["Contacts"]
  const contactId = new ObjectId(req.params.id);
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
    .collection("Contacts")
    .replaceOne({ _id: contactId }, contact);

  if (reponse.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(reponse.error || "Some error occurred while updating the contact");
  }
};

const deleteContact = async (req, res) => {
  //#swagger.tags=["Contacts"]
  const contactId = new ObjectId(req.params.id);

  const reponse = await mongodb
    .getDatabase()
    .db()
    .collection("Contacts")
    .deleteOne({ _id: contactId });

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
