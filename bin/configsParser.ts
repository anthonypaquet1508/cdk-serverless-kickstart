// cdk-app/read-configs.ts
import * as fs from 'fs';
import * as path from 'path';
import { AppConfig } from './types';

const configFolder = path.join(__dirname, '../configs');

export const readConfigs = (): AppConfig[] => {
  const files = fs.readdirSync(configFolder);
  const configs: AppConfig[] = [];

  files.forEach((file) => {
    const filePath = path.join(configFolder, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const jsonConfig: AppConfig = JSON.parse(fileContent);
    configs.push(jsonConfig);
  });

  return configs;
};