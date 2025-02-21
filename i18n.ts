import i18n from 'i18next' //bliblioteca que gerencia a internacionalização
import { initReactI18next } from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'
import en from './locales/en.json'
import pt from './locales/pt.json'
//arquivos que contem as traduções para cada idioma

const getStoredLanguage = async () => { //salvar o idioma do app
    const storedLang = await AsyncStorage.getItem('language'); //estado que contem o idioma salvo no arquvio
    return storedLang || 'pt'; //caso nao encontre nada salvo, return portugues, garantindo que sempre exista uma lang
};

i18n.use(initReactI18next).init({
    resources: { en: {translation: en}, pt: {translation: pt} }, //define para onde vai traduzir os textos em cada idioma
    lng: 'pt', //idioma inicial 
    fallbackLng: 'en', //se o idioma inicial nao for encontrado, usa o ingles
    interpolation: {escapeValue: false} //garante que exiba caracteres especiais
});

getStoredLanguage().then((lang) => i18n.changeLanguage(lang)); 
//verifica o idioma salvo e troca o idioma do app para o salvo no async

export default i18n; //perimte que a config possa ser chamada em todo arquivo