import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Function to get the path of the environment variables file.
 * @function
 * @returns {string} Complete path of the .env file.
 */
const getEnvPath = () => {
    /**
     * Actual path of the module.
     * @const
     * @type {string}
     */
    const __dirname = dirname(fileURLToPath(import.meta.url));

    /**
     * Path of the environment variables file.
     * @const
     * @type {string}
     */
    const envPath = join(__dirname, '../../.env');
    return envPath;
}

export default getEnvPath;