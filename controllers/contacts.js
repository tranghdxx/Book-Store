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

// update a new brand
const updateOne = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, email, phone, content, note, status } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (content) updateData.content = content;
    if (note) updateData.note = note;
    if (status) updateData.status = status;

    let contact = await Contact.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json(contact);
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      let key = Object.keys(err.keyValue)[0];
      if (key) {
        return res.status(400).json({ [key]: "Mã code đã tồn tại" });
      }
    }
    return res.status(500).json(err);
  }
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
  updateOne,
  deleteOne,
};
