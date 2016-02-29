const remote = require('remote');

export function getArgumentInitPath(): string {
  let initPage = ""

  const osXOpenFile = remote.getGlobal('openFilePath')
  if (osXOpenFile) {
    initPage = osXOpenFile
  }else{
    const argv = remote.process.argv
    const argPath = argv[argv.length - 1]
    if ((argv.length === 2) && (argPath) && (argPath.toLowerCase().endsWith("md"))){
      initPage = argPath
    }
  }
  return initPage
}

export function getThema(): string {
  return remote.getGlobal('cfg').thema
}
