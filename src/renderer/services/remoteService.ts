const remote = require('remote');

export function getArgumentInitPath(): string {
  const argv = remote.process.argv
  const initPage = argv[argv.length-1]
  if ((argv.length == 2) && (initPage.toLowerCase().endsWith("md"))){
    return initPage
  }else{
    return "README.md"
  }
}

export function getThema(): string {
  return remote.getGlobal('cfg').thema
}
