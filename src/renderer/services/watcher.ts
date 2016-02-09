import * as chokidar from 'chokidar'
import * as fs from 'fs'

export class Watcher {
  private watcher: any
  private currentPath: string
  private handleUpdate: any

  constructor(path: string, handleUpdate: any) {
    this.currentPath = path
    this.handleUpdate = handleUpdate

    this.watcher = chokidar.watch(this.currentPath)
    this.watcher.on('add', this.onUpdate.bind(this))
    this.watcher.on('change', this.onUpdate.bind(this))
  }

  public changeWatchPath(path: string): void {
    this.watcher.unwatch(this.currentPath)
    this.watcher.add(path)
    this.currentPath = path
  }

  private onUpdate(path: string, stats: any) {
    fs.readFile(path, 'utf8', (err: any, content: any) => {
      if (err) throw err
      this.handleUpdate(content)
    });
  }
}
