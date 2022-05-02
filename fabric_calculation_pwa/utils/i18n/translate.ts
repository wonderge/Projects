import en from './en.json';
import zh from './zh.json';

type LangToken = {
  [key: string]: {
    [x:string]: string
  }
}

const TRANSLATIONS: LangToken = {
  en,
  zh
}

const translate = (lang: string = 'en') => (token: string): string => {
  let value

  try {
    value = TRANSLATIONS[lang][token];
  } catch (err) {
    console.error(err);
    value = token;
  }

  return value;
}

export default translate;