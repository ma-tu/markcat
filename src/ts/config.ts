/// <reference path="../../typings/tsd.d.ts" />
import * as fs from 'fs'
import * as path from 'path'

const defaultConfig = {
    thema: 'thema-normal'
}

export interface Config {
    thema: string
}

export function readConfig(execPath: string): Config {
  try {
    const cfgPath = getConfigFilePath(execPath)
    return JSON.parse(fs.readFileSync(cfgPath, "utf8"));
  } catch (e) {
    console.log("can not read markcat.json");
    return defaultConfig;
  }
}

export function writeConfig(execPath: string, cfg: Config) {
  const cfgPath = getConfigFilePath(execPath)
  fs.writeFile(cfgPath, JSON.stringify(cfg, null, '  '));
}

function getConfigFilePath(execPath: string): string {
  return path.dirname(execPath) + "/markcat.json"
}
