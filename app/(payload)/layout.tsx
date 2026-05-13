import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import configPromise from '@payload-config'
import { importMap } from './admin/importMap'
import React from 'react'
import type { ServerFunctionClient } from 'payload'
import type { Metadata } from 'next'

import '@payloadcms/next/css'
import './admin-theme.css'

export const metadata: Metadata = {
  title: 'Administración — Atenea Outsourcing',
  icons: {
    icon: [{ url: '/media/images/favicon.png', type: 'image/png' }],
    shortcut: '/media/images/favicon.png',
    apple: '/media/images/favicon.png',
  },
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({ ...args, config: configPromise, importMap })
}

export default function PayloadLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout config={configPromise} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}
