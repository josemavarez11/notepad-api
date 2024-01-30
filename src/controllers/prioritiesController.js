import Priority from '../models/priorityModel.js';


const getPriorities = async (req, res, next) => {
    try {
        const priorities = await Priority.find();
        return res.status(200).json(priorities);
    } catch (error) {
        next(error);
    }
}

export default getPriorities;