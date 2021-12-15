const Brand = require("../models/Brand");
const Product = require("../models/Product");

// get all brands
const getMany = async (req, res) => {
  const categories = await Brand.find();

  res.json(categories);
};

// add a new brand
const addOne = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      errors: [{ field: "image", message: "image field is required" }],
    });
  }
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({
      errors: [{ field: "name", message: "name field is required" }],
    });
  }

  const newBrand = new Brand({
    name,
    description: description,
    image: req.file.filename,
  });

  await newBrand.save();
  res.json(newBrand);
};

// delete a brand by id
const deleteOne = async (req, res) => {
  const { id } = req.params;

  // check is any products exists  in brand
  const product = await Product.findOne({ brandId: id, isDeleted: false });
  if (product)
    return res
      .status(400)
      .json({ msg: "Trong nhà phát hành này đang có sản phẩm" });

  await Brand.findByIdAndDelete(id);

  res.json({ success: true });
};

const updateOne = async (req, res) => {
  try {
    const { id } = req.params;

    const file = req.file;
    const { name, description } = req.body;

    const updateData = {};
    if (file) updateData.image = file.filename;
    if (name) updateData.name = name;
    if (description) updateData.description = description;

    const brand = await Brand.findByIdAndUpdate(id, updateData, { new: true });
    res.json(brand);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  getMany,
  addOne,
  deleteOne,
  updateOne,
};
