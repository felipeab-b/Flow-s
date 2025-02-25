import React, { useState } from 'react';
import { View, Text,  StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Switch } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

/** Cria uma tela settingsscreen com a possibilidadde de alterar entre telas, any */
export default function SettingsScreen({ navigation }: { navigation: any }) {

    const handleSupport = () => { //função que vai permitir mandar um email para o suporte (eu :])
        Linking.openURL('mailto:aebedev01@gmail.com');
    };

    const {t, i18n} = useTranslation(); //função usada para alterar o idioma e oobjeto para gerenciar o idioma atual
    const [language, setLanguage] = useState(i18n.language); //estado que armazena o idioma atual, com useState para alterar

    const changeLang = async (lang: string) => { 
        i18n.changeLanguage(lang); ////função que altera o idioma no i18n
        setLanguage(lang); //altera o estado do lang para refletir a mudança
        await AsyncStorage.setItem('language', lang); //salva a escolha no armazenamento
    };
    
    const { isDarkMode, toggleDarkMode } = useTheme(); //retorna isDarkMode e toggleDarkMode para uso direto

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}> 

            <Text style={[styles.header, isDarkMode && styles.darkText]}>{t('settings')}</Text>

            <View style={styles.AbContainer}>
                <Text style={[styles.about, isDarkMode && styles.darkText]}>{t('about')}</Text>
                <Text style={[styles.desc, {marginTop:15}]}>{t('dev')}</Text>
                <Text style={styles.desc}>{t('version')}</Text>
                <Text style={styles.desc}>{t('description')}</Text>
            </View>
            {/** coponentes de texto do sobre, versão, dev e descrição */}

            {/** Div onde está o switch de estado */}
            <View style={styles.switchContainer}> 
                <Text style={[styles.switchLabel, isDarkMode && styles.darkText]}>{t('darkmode')}</Text>
                <Switch
                    value = {isDarkMode} //O que o switch vai trocar, o isDarkMode de true <=> false
                    onValueChange = {toggleDarkMode} //Ao fazer a troca chama a função toggleDarkMode
                />
            </View>

                <Text style={[styles.LangText, isDarkMode && styles.darkText]}>{t('choose_language')}</Text>
                <View style={styles.langCont}>
                  <TouchableOpacity style={[(language === 'pt') ? styles.selectLangpt : styles.pt]} onPress={() => changeLang('pt')} disabled={language ==='pt'}>
                    <Text style={styles.languageText}>Português</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[(language === 'en') ? styles.selectLangen : styles.en]} onPress={() => changeLang('en')} disabled={language ==='en'}>
                    <Text style={styles.languageText}>English</Text>
                  </TouchableOpacity>
                </View>
                {/** Disabled desabilita o idioma ja selecionado */}

                <Text style={[styles.supText, isDarkMode && styles.darkText]}>{t('suport')}</Text>
                <TouchableOpacity style={styles.supMail} onPress={handleSupport}>
                  <Text style={styles.contact}>{t('contact')}</Text>
                </TouchableOpacity>

              <View style={[{flexDirection:'row', width:'100%',justifyContent:'center', gap: 20,}]}>
              <TouchableOpacity style={styles.navButtonCo} onPress={() => navigation.navigate('Missões') }>
                <Text style={styles.navButtonText}>{t('go_back')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButtonNi} onPress={() => navigation.navigate('Níveis') }>
                <Text style={styles.navButtonText}>{t('go_levels')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButtonNi} onPress={() => navigation.navigate('Estatísticas') }>
                <Text style={styles.navButtonText}>{t('go_stats')}</Text>
              </TouchableOpacity>
              </View>

        </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'flex-start', 
    justifyContent: 'flex-start', 
    backgroundColor: '#f4f4f9', 
    paddingTop:35,
    },

  darkContainer: {
    backgroundColor: '#333',
  },

  header: { 
    fontSize: 40, 
    fontWeight: 'bold', 
    color: '#3f2a8c', 
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
    alignSelf: 'center',
  },
 
  AbContainer: {
    paddingHorizontal:35,
  },

  about: {
    color: '#6c51cb',
    fontSize:30,
    fontWeight:'bold',
  },

  desc: {
    color: '#afa0e3',
    fontSize:18,
  },

  darkText: {
    color: '#fff',
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:50,
    marginLeft:35,
  },

  switchLabel: {
    fontSize: 26,
    marginRight: 10,
    fontWeight:'bold',
    color:'#6c51cb',
  },

  LangText: {
    marginTop:50,
    marginLeft:35,
    fontSize: 26,
    fontWeight:'bold',
    color:'#6c51cb',
  },

  langCont: {
    alignSelf:'center',
    paddingBottom:50,
    paddingTop:50,
  },

  languageText: {
    color: '#fff', 
    fontSize: 18,
  },

  pt: {
    padding:10,
    backgroundColor:'#7d65d2',
    borderRadius: 8,
  },

  en: {
    padding:10,
    backgroundColor:'#7d65d2',
    marginTop:20,
    borderRadius: 8,
    alignSelf:'center',
  },

  selectLangpt: {
    padding:10,
    backgroundColor:'#c3b5e8',
    borderRadius: 8,
    alignSelf:'center',
  },

  selectLangen: {
    padding:10,
    backgroundColor:'#c3b5e8',
    borderRadius: 8,
    alignSelf:'center',
    marginTop:20,
  },

  navButtonCo: {
    backgroundColor: '#3f2a8c', 
    padding: 10, 
    borderRadius: 8, 
    alignItems:'center',
    width:150,
    marginTop:120,
  },

  navButtonNi: {
    backgroundColor: '#3f2a8c', 
    padding: 10, 
    borderRadius: 8, 
    width:150,
    alignItems:'center',
    marginTop:120,
  },

  navButtonText: {
    color: '#fff', 
    fontSize: 18,
  },

  supText: {
    fontSize: 26,
    fontWeight:'bold',
    color:'#6c51cb',
    marginLeft:35,
  },

  supMail: {
    padding:10,
    backgroundColor:'#7d65d2',
    marginTop:20,
    borderRadius: 8,
    alignSelf:'center',
  },

  contact: {
    color: '#fff', 
    fontSize: 18,
  },

});