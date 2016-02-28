import * as marked from 'marked'
import {highlight} from 'highlight.js';

export function convertMarkedHtml(content: string): string {
  marked.setOptions({
    highlight: function (code: string, lang: string): string {
      if (lang === undefined) {
          return code
      }
      
      const langSplit = lang.split(':')
      try {
          return highlight(langSplit[0], code).value
      } catch (e) {
          console.log(e.message)
          return code
      }
    }
  })

  return marked(content)
}
