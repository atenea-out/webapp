import {
  CollectionCards as CollectionCards_rsc,
  DefaultNav as DefaultNav_rsc,
  DocumentHeader as DocumentHeader_rsc,
  FolderField as FolderField_rsc,
  FolderTableCell as FolderTableCell_rsc,
  Logo as Logo_rsc,
} from '@payloadcms/next/rsc'
import { AteneaAdminLogo } from '@/components/payload/AteneaAdminLogo'
import { AteneaDashboardIntro } from '@/components/payload/AteneaDashboardIntro'
import { AteneaLoginIntro } from '@/components/payload/AteneaLoginIntro'
import { AteneaLogoutButton } from '@/components/payload/AteneaLogoutButton'
import { AteneaUserAvatar } from '@/components/payload/AteneaUserAvatar'

export const importMap = {
  '@/components/payload/AteneaAdminLogo#AteneaAdminLogo': AteneaAdminLogo,
  '@/components/payload/AteneaDashboardIntro#AteneaDashboardIntro': AteneaDashboardIntro,
  '@/components/payload/AteneaLoginIntro#AteneaLoginIntro': AteneaLoginIntro,
  '@/components/payload/AteneaLogoutButton#AteneaLogoutButton': AteneaLogoutButton,
  '@/components/payload/AteneaUserAvatar#AteneaUserAvatar': AteneaUserAvatar,
  '@payloadcms/next/rsc#CollectionCards': CollectionCards_rsc,
  '@payloadcms/next/rsc#DefaultNav': DefaultNav_rsc,
  '@payloadcms/next/rsc#DocumentHeader': DocumentHeader_rsc,
  '@payloadcms/next/rsc#FolderField': FolderField_rsc,
  '@payloadcms/next/rsc#FolderTableCell': FolderTableCell_rsc,
  '@payloadcms/next/rsc#Logo': Logo_rsc,
}
