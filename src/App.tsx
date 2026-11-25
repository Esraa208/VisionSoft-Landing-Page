import { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Preview } from './components/Preview'
import { Process } from './components/Process'
import { Services } from './components/Services'
import { Stats } from './components/Stats'
import { Why } from './components/Why'
import { Work } from './components/Work'
import { content, type Lang } from './content'

interface AppProps {
  lang: Lang
}

export default function App({ lang }: AppProps) {
  const navigate = useNavigate()
  const copy = content[lang]

  useLayoutEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.title = copy.meta.title
  }, [copy.meta.title, lang])

  return (
    <>
      <Nav copy={copy} lang={lang} setLang={(next) => navigate(`/${next}`)} />
      <main id="main">
        <Hero copy={copy.hero} lang={lang} />
        <Stats items={copy.stats} lang={lang} />
        <Process copy={copy.process} lang={lang} />
        <Preview copy={copy.preview} lang={lang} />
        <Why copy={copy.why} lang={lang} />
        <Services copy={copy.services} lang={lang} />
        <Work copy={copy.work} lang={lang} />
        <Contact copy={copy.contact} lang={lang} />
      </main>
      <Footer copy={copy} lang={lang} />
    </>
  )
}

