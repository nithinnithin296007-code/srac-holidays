import { Helmet } from 'react-helmet-async'

const DEFAULT_IMAGE = 'https://www.sracholidays.com/logo.jpg'
const BASE_URL = 'https://www.sracholidays.com'

export default function SEO({ title, description, slug, image }) {
  const base = 'SRAC Holidays'
  const fullTitle = title ? title + ' – ' + base : base + ' | Mumbai Tours Since 2003'
  const fullDesc = description || "Mumbai's original local tour operator since 2003. Bollywood tours, Dharavi, heritage walks, food tours and more."
  const url = BASE_URL + (slug ? '/tours/' + slug : '')
  const ogImage = image || DEFAULT_IMAGE

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDesc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDesc} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDesc} />
      <meta name="twitter:image" content={ogImage} />
      <link rel="canonical" href={url} />
    </Helmet>
  )
}
