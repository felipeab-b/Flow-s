/*
DEFINIÇÃO DOS PONTOS POR NÍVEL
Nível 1: 0–100 pontos
Nível 2: 101–200 pontos
Nível 3: 201–300 pontos
…
Nível 10: 900–1000 pontos
*/

import { TouchableOpacity, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { useTheme } from "../contexts/ThemeContext";


export default function LevelsScreen({ navigation }: {navigation: any}){

    const { t } =  useTranslation();

    const [level, setLevel] = useState(1);
    const [points, setPoints] = useState(0);

    const { isDarkMode, toggleDarkMode } = useTheme();

    const MaxLevel = Array.from({length: 10 }, (_, index) => (index + 1) * 100);
    //array de 10 elementos, para o index 0 o valor será 100 para index 1 será 200 e ...

    const PointsToLevel = (points:number): number => { //função que recebe o valor atual de pontos
        for (let i = MaxLevel.length - 1; i >= 0; i--) { //Laço começa no 1000 e vai descendo ate o 0
            if (points >= MaxLevel[i]){ //If verifica se o número de pontos é maior ou igual os limites de nível se for sobe nível
                return i + 1;
            }
        }
        return 1; //Caso tenha 0 pontos = nível 1 
    };

    useFocusEffect(
        //executa um efeito toda vez que a tela ganha foco
        React.useCallback(() => { //garante que a função nao seja recriada todas as vezes so quando existe mudança
          const hPoints = async () => { 
            const storedPoints = await AsyncStorage.getItem('points'); //busca no banco de dados o valor dos pontos
            if (storedPoints) { 
              //caso achem os pontos é necessario convertes esse valor em número
              const parsedPoints = JSON.parse(storedPoints);
              setPoints(parsedPoints); //atualiza o valor dos pontos
              setLevel(PointsToLevel(parsedPoints)); //atualiza o valor do nível baseado nos pontos
            }
          };
    
          hPoints(); //chama a função
        }, [])
      );

    //estado que armazena as cores referentes a cada nível
    const backgroundColor = level === 1 ? '#FFDDC1' :
                                level === 2 ? '#FFABAB' :
                                    level === 3 ? '#FFC3A0' :
                                        level === 4 ? '#FF8B8B' :
                                            level === 5 ? '#FF6B6B' :
                                                level === 6 ? '#FF4D4D' :
                                                    level === 7 ? '#FF1F1F' :
                                                        level === 8 ? '#E60000' :
                                                            level === 9 ? '#B30000' : '#800000';
                                
    //estado que armazena as imagens referentes a cada nível
    const imageBackground =[require('../assets/images/level1.png'),
                                require('../assets/images/level2.png'),
                                     require('../assets/images/level3.png'),
                                        require('../assets/images/level4.png'),
                                            require('../assets/images/level5.png'),
                                                require('../assets/images/level6.png'),
                                                    require('../assets/images/level7.png'),
                                                        require('../assets/images/level8.png'),
                                                            require('../assets/images/level9.png'),
    ];
                
    return (
        <View style = {[styles.container, isDarkMode && styles.darkCont]}>
            
        <Text style={[styles.levelText, isDarkMode && styles.darkText]}>{t('level') + level}</Text>
        <Text style={[styles.pointsText, isDarkMode && styles.darkText]}>{t('points') + points}</Text>

        <View style = {[styles.levelBG,{backgroundColor}]}>
            <Image source={imageBackground[level - 1]} style={styles.image} />
        </View>

        <View style = {[{flexDirection:'row', width:'100%',justifyContent:'center', gap: 20, position:'absolute', bottom:'3.7%'}]}>
            <TouchableOpacity style={styles.navButtonCo} onPress={() => navigation.navigate('Configurações') }>
            <Text style={styles.navButtonText}>{t('settings')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.navButtonNi} onPress={() => navigation.navigate('Missões') }>
            <Text style={styles.navButtonText}>{t('go_back')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.navButtonSt} onPress={() => navigation.navigate('Estatísticas') }>
            <Text style={styles.navButtonText}>{t('go_stats')}</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 35,
    },

    darkCont: {
        backgroundColor: '#333',
    },
    
    darkText: {
        color: '#fff',
    },

    levelText: {
        color: '#3f2a8c',
        fontWeight: 'bold',
        paddingBottom: 7,
        paddingLeft: 30,
        paddingRight: 30,
        fontSize: 40,
    },

    pointsText: {
      fontSize: 20,
    },

    navButtonCo: { 
        backgroundColor: '#3f2a8c', 
        padding: 10, 
        borderRadius: 8, 
        width:150,
        alignItems:'center',
      },
    
      navButtonNi: { 
        backgroundColor: '#3f2a8c', 
        padding: 10, 
        borderRadius: 8, 
        width:150,
        alignItems:'center',
      },
    
      navButtonSt: { 
        backgroundColor: '#3f2a8c', 
        padding: 10, 
        borderRadius: 8, 
        width:150,
        alignItems:'center',
      },

      navButtonText: { 
        color: '#fff', 
        fontSize: 18 
      },

      levelBG: {
        width:400,
        height: 400,
        position:'absolute',
        bottom: '34%',
        alignItems :'center',
        justifyContent:'center',
      },

      image: {
        width: 200,
        height: 200,
      },

  });