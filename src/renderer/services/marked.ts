import * as marked from 'marked'
import {highlight} from 'highlight.js';

export function convertMarkedHtml(content: string): string {
  marked.setOptions({
    highlight: function (code: string, lang: string): string {
      if (lang === undefined) {
          return code;
      }

      return highlight(lang, code).value;
    }
  })

  let html = marked(content)
  return html
}
