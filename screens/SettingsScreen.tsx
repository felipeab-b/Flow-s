import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

/** Cria uma tela settingsscreen com a possibilidadde de alterar entre telas, any */
export default function SettingsScreen({ navigation }: { navigation: any }) {
 
    return (
        <View style={styles.container}>

            <Text style={styles.header}>Configurações</Text>
            <Button title="Voltar para Missões" onPress={() => navigation.navigate('Missões')} />

        </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#f4f4f9' 
    },

  header: { 
    fontSize: 30, 
    fontWeight: 'bold', 
    color: '#3f2a8c', 
    marginBottom: 20 
    },
 
});