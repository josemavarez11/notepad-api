/**
 * @description Express router for handling category-related routes.
 * @module categoriesRouter
 */

// External module import.
import { Router } from "express";

// Internal module import.
import { createCategory, getCategories, updateCategoryName, deleteCategory } from "../controllers/categoriesController.js";

/**
 * Instance of the Express Router.
 * @type {object}
 * @const
 */
const categoriesRouter = Router();

/**
 * Route to create a new category.
 * It needs: id(user) and name(category).
 * @name post/createCategory
 * @function
 * @memberof module:categoriesRouter
 */
categoriesRouter.post("/createCategory", createCategory);

/**
 * Route to get all categories.
 * @name get/getAllCategories
 * @function
 * @memberof module:categoriesRouter
 */
categoriesRouter.get("/getAllCategories", getCategories);

/**
 * Route to update a category name.
 * It needs: id(user), oldName(category) and newName(category).
 * @name put/updateCategoryName
 * @function
 * @memberof module:categoriesRouter
 */
categoriesRouter.put("/updateCategoryName", updateCategoryName);

/**
 * Route to delete a category.
 * It needs: id(user) and name(category).
 * @name delete/deleteCategory
 * @function
 * @memberof module:categoriesRouter
 */
categoriesRouter.delete("/deleteCategory", deleteCategory);

export default categoriesRouter;