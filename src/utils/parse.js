import { unified } from 'unified'

import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'


export const convertMarkdownToHtml = async (markdownText) => {
  try {
    const result = await unified()
      .use(remarkParse)          // 마크다운 파싱
      .use(remarkGfm)            // GFM(GitHub Flavored Markdown) 지원
      .use(remarkRehype, {       // 마크다운 AST를 HTML AST로 변환
        allowDangerousHtml: true // 마크다운 내 HTML 태그 허용
      })
      .use(rehypeStringify, {    // HTML로 변환
        allowDangerousHtml: true // 원래 HTML 태그 보존
      })
      .process(markdownText)

    return String(result.value)
  } catch (e) {
    console.log(e)
    return markdownText // 오류 시 원본 반환
  }
}

