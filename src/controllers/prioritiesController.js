//External module imports.
import Priority from '../models/priorityModel.js';

/**
 * Function to get all priorities.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {void}
 */
const getPriorities = async (req, res, next) => {
    try {
        const priorities = await Priority.find();
        return res.status(200).json(priorities);
    } catch (error) {
        next(error);
    }
}

export default getPriorities;