import { TouchableOpacity, StyleSheet, View, Text, Dimensions } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LineChart } from "react-native-chart-kit";
import { useResponsive } from "../contexts/useResponsive";

export default function StatsScreen({ navigation }: {navigation: any}){

    const { t } =  useTranslation();
    const {isDarkMode} = useTheme();
    const {isMedium} = useResponsive();


    const [points, setPoints] = useState(0);
    const [completedMissions, setCompMissions] = useState(0);

    useEffect(() => {
        const loadStats = async() => {
            const savedPoints = await AsyncStorage.getItem('points');
            const savedMissions = await AsyncStorage.getItem('completedMissions');
            if (savedPoints) {
                setPoints(JSON.parse(savedPoints));
              }
              if (savedMissions) {
                setCompMissions(JSON.parse(savedMissions));
              }
            };
            loadStats();
        }
    ,[]);

    return (

        <View style={[styles.container, isDarkMode && styles.darkCont]}>

            <Text style={[styles.header, isDarkMode && styles.darkText]}>{t('go_stats')}</Text>

                <Text style={[styles.text, isDarkMode && styles.darkText]}>{t('points')}: {points}</Text>
                <Text style={[styles.text, isDarkMode && styles.darkText]}>{t('completed_missions')}: {completedMissions}</Text>
                <Text style={[styles.text, isDarkMode && styles.darkText]}>...</Text>

            <View style = {[{flexDirection:'row', width:'100%',justifyContent:'center', gap: 20, position:'absolute', bottom:'3.7%'}, isMedium && {marginBottom:6}]}>
                <TouchableOpacity style={[styles.navButtonCo, isMedium && {width:'auto'}]} onPress={() => navigation.navigate('Configurações') }>
                <Text style={styles.navButtonText}>{t('settings')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {[styles.navButtonNi, isMedium && {width:'auto'}]} onPress={() => navigation.navigate('Missões') }>
                <Text style={styles.navButtonText}>{t('go_back')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {[styles.navButtonSt, isMedium && {width:'auto'}]} onPress={() => navigation.navigate('Níveis') }>
                <Text style={styles.navButtonText}>{t('go_levels')}</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
};

const styles = StyleSheet.create ({

    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 35,
    },

    header: {
        color: '#3f2a8c',
        fontWeight: 'bold',
        paddingBottom: 20,
        paddingLeft: 30,
        paddingRight: 30,
        fontSize: 40,
        alignSelf:'center',
    },

    darkCont: {
        backgroundColor: '#333',
    },
    
    darkText: {
        color: '#fff',
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

    text: {
        color: '#6c51cb',
        fontSize:27,
        fontWeight:'bold',
        paddingHorizontal:35,
        paddingVertical:35,
    },

});