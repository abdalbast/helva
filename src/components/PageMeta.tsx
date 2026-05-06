import { Helmet } from 'react-helmet-async';
import { supportedLanguages } from '@/i18n/config';

interface PageMetaProps {
  title: string;
  description: string;
  path: string;
  lang?: string;
}

const BASE_URL = 'https://helva.io';

const PageMeta = ({ title, description, path, lang = 'en' }: PageMetaProps) => {
  const url = `${BASE_URL}/${lang}${path === '/' ? '' : path}`;
  const fullTitle = path === '/' && lang === 'en' ? title : `${title} — Helva Ltd.`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {supportedLanguages.map((l) => (
        <link
          key={l}
          rel="alternate"
          hrefLang={l}
          href={`${BASE_URL}/${l}${path === '/' ? '' : path}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/en${path === '/' ? '' : path}`} />
    </Helmet>
  );
};

export default PageMeta;
