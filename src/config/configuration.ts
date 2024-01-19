import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILE = join(process.cwd(), 'env.yml');

export default () => {
    return yaml.load(readFileSync(YAML_CONFIG_FILE, 'utf8')) as Record<
        string,
        any
    >;
};
