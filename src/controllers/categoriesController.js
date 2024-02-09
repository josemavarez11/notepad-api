//External modules imports.
import Category from "../models/categoryModel.js";
import User from "../models/userModel.js";
import Note from "../models/noteModel.js";

/**
 * Function to create a new category.
 * @param {*} req 
 * @param {*} res 
 * @returns {void}
 */
export const createCategory = async (req, res) => {
    const id = req.user._id;
    const { name } = req.body;

    if(!id) return res.status(400).json({ message: "User ID is required to create a new category." });
    if(!name) return res.status(400).json({ message: "Category name is required to create a new category." });

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found." });

        const categoryMatch = await Category.findOne({ user: id,  name: name });
        if(categoryMatch) return res.status(400).json({ message: "Category already exists. No changes made." });

        const category = new Category({ user: user, name: name });
        await category.save();
        res.status(201).json({ message: "Category created successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Function to get all categories.
 * @param {*} req 
 * @param {*} res 
 * @returns {void}
 */
export const getCategories = async (req, res) => {
    const id = req.user._id;

    if(!id) return res.status(400).json({ message: "User ID is required to get categories." });

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found." });

        const categories = await Category.find({ user: id });
        const formattedCategories = categories.map(category => {
            return { id: category._id, name: category.name };
        });

        res.status(200).json(formattedCategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Function to update a category name.
 * @param {*} req 
 * @param {*} res 
 * @returns {void}
 */
export const updateCategoryName = async (req, res) => {
    const id = req.user._id;
    const { oldName, newName } = req.body;

    if(!id) return res.status(400).json({ message: "User ID is required to update a category." });
    if(!oldName) return res.status(400).json({ message: "Old category name is required to update a category." });
    if(!newName) return res.status(400).json({ message: "New category name is required to update a category." });

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found." });

        const category = await Category.findOne({ user: id, name: oldName });
        if(!category) return res.status(404).json({ message: "Category not found." });

        const categoryMatch = await Category.findOne({ user: id, name: newName });
        if(categoryMatch) return res.status(400).json({ message: "Category already exists. No changes made." });

        category.name = newName;
        await category.save();
        res.status(200).json({ message: "Category updated successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Function to delete a category.
 * @param {*} req 
 * @param {*} res 
 * @returns {void}
 */
export const deleteCategory = async (req, res) => {
    const id = req.user._id;
    const { name } = req.body;

    if(!id) return res.status(400).json({ message: "User ID is required to delete a category." });
    if(!name) return res.status(400).json({ message: "Category name is required to delete a category." });

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found." });

        const category = await Category.findOne({ user: id, name: name });
        if(!category) return res.status(404).json({ message: "Category not found." });

        await Note.deleteMany({ category: category._id });

        await category.deleteOne();
        res.status(200).json({ message: "Category deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}