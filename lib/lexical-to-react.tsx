import React from 'react'

/**
 * Serializer minimalista de Lexical (Payload richText) → React.
 * Cubre: paragraph, heading (h1-h6), list (ordered/unordered) + listitem,
 * link, quote, text con formatos (bold, italic, underline, strikethrough, code).
 *
 * Suficiente para el contenido de posts, servicios e industrias.
 */

type LexNode = {
  type: string
  version?: number
  children?: LexNode[]
  // text
  text?: string
  format?: number | string
  // heading
  tag?: string
  // list
  listType?: 'bullet' | 'number'
  // link
  fields?: { linkType?: 'custom' | 'internal'; url?: string; newTab?: boolean }
  url?: string
  // generic
  [key: string]: unknown
}

type LexRoot = {
  root?: { children?: LexNode[] }
}

// Bitmasks de format en Lexical text nodes
const FMT_BOLD = 1
const FMT_ITALIC = 1 << 1
const FMT_STRIKE = 1 << 2
const FMT_UNDERLINE = 1 << 3
const FMT_CODE = 1 << 4

function renderText(node: LexNode, key: React.Key) {
  const text = node.text ?? ''
  const fmt = typeof node.format === 'number' ? node.format : 0
  const keyString = String(key)
  let el: React.ReactNode = text
  if (fmt & FMT_CODE) el = <code key={`c${keyString}`}>{el}</code>
  if (fmt & FMT_STRIKE) el = <s key={`s${keyString}`}>{el}</s>
  if (fmt & FMT_UNDERLINE) el = <u key={`u${keyString}`}>{el}</u>
  if (fmt & FMT_ITALIC) el = <em key={`i${keyString}`}>{el}</em>
  if (fmt & FMT_BOLD) el = <strong key={`b${keyString}`}>{el}</strong>
  return <React.Fragment key={key}>{el}</React.Fragment>
}

function renderChildren(children: LexNode[] | undefined) {
  if (!children) return null
  return children.map((c, i) => renderNode(c, i))
}

function renderNode(node: LexNode, key: React.Key): React.ReactNode {
  switch (node.type) {
    case 'text':
      return renderText(node, key)

    case 'linebreak':
      return <br key={key} />

    case 'paragraph':
      return <p key={key}>{renderChildren(node.children)}</p>

    case 'heading': {
      const tag = (node.tag as string) || 'h2'
      const Tag = tag as keyof React.JSX.IntrinsicElements
      return <Tag key={key}>{renderChildren(node.children)}</Tag>
    }

    case 'quote':
      return <blockquote key={key}>{renderChildren(node.children)}</blockquote>

    case 'list': {
      const Tag = node.listType === 'number' ? 'ol' : 'ul'
      return <Tag key={key}>{renderChildren(node.children)}</Tag>
    }

    case 'listitem':
      return <li key={key}>{renderChildren(node.children)}</li>

    case 'link': {
      const href = (node.fields?.url as string) || (node.url as string) || '#'
      const target = node.fields?.newTab ? '_blank' : undefined
      const rel = target ? 'noopener noreferrer' : undefined
      return (
        <a key={key} href={href} target={target} rel={rel}>
          {renderChildren(node.children)}
        </a>
      )
    }

    case 'root':
      return <>{renderChildren(node.children)}</>

    default:
      // Pass-through unknowns: render their children to avoid losing content
      if (node.children) return <React.Fragment key={key}>{renderChildren(node.children)}</React.Fragment>
      return null
  }
}

/**
 * Renderiza un doc Lexical proveniente de Payload.
 */
export function RichText({ data, className }: { data: unknown; className?: string }) {
  const root = (data as LexRoot)?.root
  if (!root?.children?.length) return null
  return <div className={className}>{root.children.map((n, i) => renderNode(n, i))}</div>
}

/**
 * Extrae texto plano (sin formato) para usos como previews o SEO.
 */
export function richTextToPlain(data: unknown): string {
  const root = (data as LexRoot)?.root
  if (!root?.children?.length) return ''
  const parts: string[] = []
  const walk = (n: LexNode) => {
    if (n.type === 'text' && n.text) parts.push(n.text)
    n.children?.forEach(walk)
  }
  root.children.forEach(walk)
  return parts.join(' ').replace(/\s+/g, ' ').trim()
}
