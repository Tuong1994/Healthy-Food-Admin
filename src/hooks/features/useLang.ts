import useLangStore from "@/store/LangStore";

const useLang = () => {
  const [lang, locale] = useLangStore((state) => [state.lang, state.locale]);
  return { lang, locale };
};

export default useLang;
