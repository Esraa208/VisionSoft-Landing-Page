import { useLayoutEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { LoginCard } from '../components/LoginCard'
import { Nav } from '../components/Nav'
import { content, type Lang } from '../content'

function isLang(value: string | undefined): value is Lang {
  return value === 'ar' || value === 'en'
}

export function LoginPage() {
  const { locale } = useParams()
  const navigate = useNavigate()
  const lang = isLang(locale) ? locale : 'ar'
  const copy = content[lang]

  useLayoutEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.title = copy.login.title
  }, [copy.login.title, lang])

  if (!isLang(locale)) {
    return <Navigate to="/ar/login" replace />
  }

  return (
    <>
      <Nav copy={copy} lang={lang} setLang={(next) => navigate(`/${next}/login`)} />
      <LoginCard copy={copy} lang={lang} />
    </>
  )
}
