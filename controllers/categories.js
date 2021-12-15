const Category = require("../models/Category");
const Product = require("../models/Product");

// get all categories
const getMany = async (req, res) => {
  const { limit, offset } = req.query;

  const categories = await Category.aggregate([
    {
      $lookup: {
        from: "subcategories",
        localField: "_id",
        foreignField: "categoryId",
        as: "subcategories",
      },
    },
  ]).sort({ createdAt: -1 });
  // .limit(limit ? parseInt(limit) : 0)
  // .skip(offset ? parseInt(offset) : 0);
  res.json(categories);
};

// add a new category
const addOne = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({
      errors: [{ field: "name", message: "Tên không được để trống" }],
    });
  }
  if (!description) {
    return res.status(400).json({
      errors: [{ field: "description", message: "Mô tả không được để trống" }],
    });
  }

  const newCategory = new Category({
    name,
    description,
  });

  await newCategory.save();
  res.json(newCategory);
};

// delete a category by id
const deleteOne = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOne({ categoryId: id, isDeleted: false });

  if (product)
    return res.status(400).json({ msg: "Trong danh mục này đang có sản phẩm" });

  await Category.findByIdAndDelete(id);

  res.json({ success: true });
};

// update category by id
const updateOne = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, description } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;

    let category = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json(category);
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
