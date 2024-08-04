const slugify = require("slugify");
const categorySchema = require("../models/categoryModel.js");

// create category
const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        message: "Name is Required...",
      });
    }
    const existingCategory = await categorySchema.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category already Exists...",
      });
    }
    const category = await new categorySchema({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "New Category Created...",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in category...",
    });
  }
};

// update category
const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categorySchema.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { name: true }
    );
    res.status(200).send({
      success: true,
      message: "Category updated successfully...",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error , While updating category...",
    });
  }
};

// get all category
const categoryController = async (req, res) => {
  try {
    const category = await categorySchema.find({});
    res.status(200).send({
      success: true,
      message: "All Categories Listed...",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "erroe while getting all categories...",
    });
  }
};

// single category
const singleCategoryController = async (req, res) => {
  try {
    console.log("slug:", req.params.slug);
    const category = await categorySchema.findOne({ slug: req.params.slug });

    res.status(200).send({
      success: true,
      message: "Getting single category successfully...",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single category",
    });
  }
};

// delete category
const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categorySchema.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category deleted successfully...",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while deleting category",
    });
  }
};

module.exports = {
  createCategoryController,
  updateCategoryController,
  categoryController,
  singleCategoryController,
  deleteCategoryController,
};
