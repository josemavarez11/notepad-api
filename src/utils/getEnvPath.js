import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const getEnvPath = () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const envPath = join(__dirname, '../../.env');
    return envPath;
}

export default getEnvPath;