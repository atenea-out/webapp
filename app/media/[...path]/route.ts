import { readFile } from 'fs/promises'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

const fallbackRoot = path.join(process.cwd(), 'public', 'assets', 'media')

const contentTypes: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.webp': 'image/webp',
}

function resolveFallbackPath(parts: string[]) {
  const requestedPath = path.normalize(path.join(...parts))

  if (requestedPath.startsWith('..') || path.isAbsolute(requestedPath)) {
    return null
  }

  return path.join(fallbackRoot, requestedPath)
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: parts } = await params
  const filePath = resolveFallbackPath(parts)

  if (!filePath) {
    return new NextResponse('Not found', { status: 404 })
  }

  try {
    const file = await readFile(filePath)
    const ext = path.extname(filePath).toLowerCase()

    return new NextResponse(file, {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Type': contentTypes[ext] || 'application/octet-stream',
      },
    })
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }
}
