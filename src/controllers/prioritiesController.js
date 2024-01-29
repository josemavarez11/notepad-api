import Priority from '../models/priorityModel.js';


const getPriorities = async (req, res, next) => {
    try {
        const priorities = await Priority.find();
        
        const formattedPriorities = priorities.map(priority => {
            return {
                value: priority.value,
                description: priority.description
            };
        });
        
        res.status(200).json(formattedPriorities);
    } catch (error) {
        next(error);
    }
}

export default getPriorities;