import { promises as fs } from 'fs'
import path from 'path'
import { marked } from 'marked'

export type LegalDocDef = {
  slug: string
  title: string
  description: string
  sourceFile: string
  startHeading?: string
  endHeading?: string
}

const complianceDir = path.join(process.cwd(), 'compliance')

export const LEGAL_DOCS: Record<string, LegalDocDef> = {
  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    description: 'How HR Ops collects, uses, and protects your personal data.',
    sourceFile: '01-privacy-policy.md',
  },
  terms: {
    slug: 'terms',
    title: 'Terms of Service',
    description: 'Terms governing the use of HR Ops services.',
    sourceFile: '02-terms-of-service.md',
  },
  dpa: {
    slug: 'dpa',
    title: 'Data Processing Agreement',
    description: 'Data processing terms under GDPR Article 28 and DPDP obligations.',
    sourceFile: '03-data-processing-agreement.md',
  },
  cookies: {
    slug: 'cookies',
    title: 'Cookie Policy',
    description: 'Cookie categories, purposes, and consent controls for HR Ops.',
    sourceFile: '04-cookie-policy.md',
  },
  'acceptable-use': {
    slug: 'acceptable-use',
    title: 'Acceptable Use Policy',
    description: 'Rules for proper and secure use of HR Ops.',
    sourceFile: '05-acceptable-use-policy.md',
  },
  security: {
    slug: 'security',
    title: 'Security Policy',
    description: 'Security controls, practices, and incident commitments.',
    sourceFile: '06-security-policy.md',
  },
  dpdp: {
    slug: 'dpdp',
    title: 'DPDP Compliance Statement',
    description: 'How HR Ops aligns with the DPDP Act 2023.',
    sourceFile: '07-dpdp-compliance-statement.md',
  },
  'eu-privacy': {
    slug: 'eu-privacy',
    title: 'EU/UK Privacy Notice',
    description: 'Supplemental privacy notice for EU and UK data subjects.',
    sourceFile: '08-eu-uk-privacy-notice.md',
  },
  'sub-processors': {
    slug: 'sub-processors',
    title: 'Sub-processor List',
    description: 'Current sub-processors used by HR Ops and change process.',
    sourceFile: '09-sub-processors-and-ai-transparency.md',
    startHeading: '# Sub-processor List',
    endHeading: '# AI Transparency Report',
  },
}

export const AI_TRANSPARENCY_DOC: LegalDocDef = {
  slug: 'ai-transparency',
  title: 'AI Transparency Report',
  description: 'How HR Ops AI screening works, with limitations and oversight controls.',
  sourceFile: '09-sub-processors-and-ai-transparency.md',
  startHeading: '# AI Transparency Report',
}

function sectionBetweenHeadings(
  markdown: string,
  startHeading?: string,
  endHeading?: string,
): string {
  if (!startHeading && !endHeading) {
    return markdown
  }

  const normalized = markdown.replace(/\r\n/g, '\n')
  const startIndex = startHeading ? normalized.indexOf(startHeading) : 0

  if (startHeading && startIndex === -1) {
    return normalized
  }

  const from = startIndex >= 0 ? startIndex : 0
  const tail = normalized.slice(from)
  const endIndex = endHeading ? tail.indexOf(endHeading) : -1

  return endIndex >= 0 ? tail.slice(0, endIndex).trim() : tail.trim()
}

export async function getLegalDocContent(def: LegalDocDef): Promise<string> {
  const filePath = path.join(complianceDir, def.sourceFile)
  const raw = await fs.readFile(filePath, 'utf8')
  return sectionBetweenHeadings(raw, def.startHeading, def.endHeading)
}

export async function getLegalDocHtml(def: LegalDocDef): Promise<string> {
  const markdown = await getLegalDocContent(def)
  return marked.parse(markdown, { gfm: true }) as string
}
