const appBase = process.env.NEXT_PUBLIC_APP_BASE_URL || 'https://apps.hrops.io'

// External app URLs — all app entry points live here.
// Set NEXT_PUBLIC_APP_BASE_URL in .env.local to point at staging:
//   NEXT_PUBLIC_APP_BASE_URL=https://apps.staging.hrops.io
export const APP_BASE_URL = appBase.replace(/\/$/, '')

export const APP_EMPLOYER_URL = `${APP_BASE_URL}/employer`
export const APP_AGENCY_URL = `${APP_BASE_URL}/agency`
export const APP_LOGIN_URL = `${APP_BASE_URL}/login`
export const APP_SIGNUP_URL = `${APP_BASE_URL}/signup`
