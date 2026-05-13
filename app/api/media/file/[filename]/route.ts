import { readFile } from 'fs/promises'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

const uploadRoot = path.join(/*turbopackIgnore: true*/ process.cwd(), 'public', 'media')
const fallbackRoot = path.join(/*turbopackIgnore: true*/ process.cwd(), 'public', 'assets', 'media')

const contentTypes: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.webp': 'image/webp',
}

function safeFileName(filename: string) {
  const normalized = path.normalize(filename)

  if (normalized.includes('..') || path.isAbsolute(normalized) || normalized !== path.basename(normalized)) {
    return null
  }

  return normalized
}

async function readFirstAvailable(filename: string) {
  const candidates = [
    path.join(uploadRoot, filename),
    path.join(fallbackRoot, filename),
    path.join(fallbackRoot, 'images', filename),
  ]

  for (const candidate of candidates) {
    try {
      return {
        buffer: await readFile(candidate),
        filePath: candidate,
      }
    } catch {
      // Try the next source. Payload uploads live in /public/media; base assets live in /public/assets/media.
    }
  }

  return null
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ filename: string }> },
) {
  const { filename: rawFilename } = await params
  const filename = safeFileName(rawFilename)

  if (!filename) {
    return new NextResponse('Not found', { status: 404 })
  }

  const file = await readFirstAvailable(filename)

  if (!file) {
    return new NextResponse('Not found', { status: 404 })
  }

  const ext = path.extname(file.filePath).toLowerCase()

  return new NextResponse(file.buffer, {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Type': contentTypes[ext] || 'application/octet-stream',
    },
  })
}
