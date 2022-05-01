import { useRouter } from "next/router";
import translate from "../utils/i18n/translate";

const useLocale = () => {
  const { locale, defaultLocale } = useRouter();
  const t = translate(locale);

  return { locale, defaultLocale, t }
}

export default useLocale