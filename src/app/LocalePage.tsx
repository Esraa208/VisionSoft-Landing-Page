import { Navigate, useParams } from 'react-router-dom'
import App from '../App'
import type { Lang } from '../content'

function isLang(value: string | undefined): value is Lang {
  return value === 'ar' || value === 'en'
}

export function LocalePage() {
  const { locale } = useParams()
  if (!isLang(locale)) {
    return <Navigate to="/ar" replace />
  }
  return <App lang={locale} />
}
