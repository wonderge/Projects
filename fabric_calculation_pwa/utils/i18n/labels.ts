import en from './en.json';
import zh from './zh.json';

export type Labels = {
  [key: string]: string
}

const getLabels = (lang: string | undefined): Labels => {
  if (lang == 'zh') {
    return zh;
  } else {
    return en;
  }
}

export default getLabels;