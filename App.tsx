import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; /** Envolve todo app e gerencia as transições */
import { createStackNavigator } from '@react-navigation/stack'; /** Cria uma pilha onde cada tela e empilahda */
/** Importa as outras telas */
import MissionsScreen from './screens/MissionScreen';
import SettingsScreen from './screens/SettingsScreen';
import LevelsScreen from './screens/LevelsScreen';
import { ThemeProvider } from './contexts/ThemeContext';
import './i18n';
import StatsScreen from './screens/StatsScreen';

/** Variavel para definir quais telas vao fazer parte da navegação */
const Stack = createStackNavigator();

export default function App() {
  
  return (
    <ThemeProvider>
      {/**envolve toda estrutura de navegação */}
      <NavigationContainer>
        {/** Define um navegador em pilha, onde a primera tela sera missoes */}
        <Stack.Navigator initialRouteName="Missões">
          {/** Define o nome de cada tela dentro do app */}
          <Stack.Screen name="Missões" component={MissionsScreen} />
          <Stack.Screen name="Configurações" component={SettingsScreen} />
          <Stack.Screen name="Níveis" component={LevelsScreen} />
          <Stack.Screen name="Estatísticas" component={StatsScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}