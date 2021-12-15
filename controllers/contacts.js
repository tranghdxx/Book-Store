const Contact = require("../models/Contact");

// get all brands
const getMany = async (req, res) => {
  const contacts = await Contact.find();

  res.json(contacts);
};

// add a new brand
const addOne = async (req, res) => {
  const { name, email, phone, content } = req.body;

  const newContact = new Contact({
    name,
    email,
    phone,
    content,
  });

  await newContact.save();
  res.json(newContact);
};

// delete a brand by id
const deleteOne = async (req, res) => {
  const { id } = req.params;

  await Contact.findByIdAndDelete(id);

  res.json({ success: true });
};

module.exports = {
  getMany,
  addOne,
  deleteOne,
};
