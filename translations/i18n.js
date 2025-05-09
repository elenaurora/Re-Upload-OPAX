import i18next from "i18next";
import translations from "./translations.json";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from 'react-native-localize'


const languageDetector = {
    type:'languageDetector',
    async:true,
    detect:(callback) => {
        return callback(RNLocalize.getLocales()[0].languageCode)
    },
    init:()=>{},
    cacheUserLanguage:()=>{}
}
i18next.use(languageDetector).use(initReactI18next).init({
    compatibilityJSON: 'v3',
    fallbackLng:'en',
    resources:translations,
    react: {
        useSuspence: false
    }
})
export default i18next;