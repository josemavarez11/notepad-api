import { Router } from "express";
import { createCategory, getCategories, updateCategoryName, deleteCategory } from "../controllers/categoriesController.js";

const categoriesRouter = Router();

categoriesRouter.post("/createCategory", createCategory);
categoriesRouter.get("/getAllCategories", getCategories);
categoriesRouter.put("/updateCategoryName", updateCategoryName);
categoriesRouter.delete("/deleteCategory", deleteCategory);

export default categoriesRouter;