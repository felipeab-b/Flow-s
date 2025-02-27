import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Alert, TextInput, Animated, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
/*TouchableOpacity para adicionar um botão personalizavel*/
/**FlatList forma de deixar as missões pendentes em uma lista mais dinamica, pode se marcar como feita e adicionar */
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next'; //importa a função de tradução
import { useResponsive } from '../contexts/useResponsive';

/** Cria uma tela missionscreen com função de mudar de telas, any = nao existe verificação do tipo de tela */
export default function MissionScreen({ navigation }: { navigation: any}) {

  const {isMedium} = useResponsive();

  const { t } = useTranslation(); //cham a função t que retorna o valor associado no idioma salvo

  const { isDarkMode } = useTheme(); //retorna isDarkMode para uso Direto

  /** lista com as missões e função para adicionar uma missão nova */
  /** Os itens tem uma propriedade de completed para saber se foram concluidos */
  const [missions, setMissions] = useState<{ id: string, name: string, completed: boolean}[]>([]);

  /** Variavel que armazena o nome da nova missão. iniciando com uma string vazia, set... atualiza o valor da variavel
  relacioonada ao text input */
  const [newMissionName, setNewMissionName] = useState('');

  /** Variavel que armazena o número de pontos, comeca no 0. Set atualiza o valor de poitns forçando um novo render */
  const [points, setPoints] = useState(0);

  const [completedMissions, setCompMissions] = useState(0);

  /** definir pontos iniciais das animações assim como impedir que eles sejam zeradas com as renderizações */
  const pointsAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  /** executa apos a renderização, como esta em branco [] o react so executa uma vez */
  useEffect(() => {
    const loadData = async () => { /** função assincrona do programa */
      try {
        const storedMissions = await AsyncStorage.getItem('missions'); 
        /** cria uma constante que puxa os valores dos vetores missions como JSON  */
        const storedPoints = await AsyncStorage.getItem('points');
        const storedCompletedMissions = await AsyncStorage.getItem('completedMissions');
  
        if (storedMissions) setMissions(JSON.parse(storedMissions)); 
        /**Caso encontre valores em missions os transforma em array e atualiza o estado*/
        if (storedPoints !== null) {
        /** caso encontre um valor de pontos não nulo faz o mesmo da linha acima */
          setPoints(JSON.parse(storedPoints));
        }
        if (storedCompletedMissions !== null) setCompMissions(JSON.parse(storedCompletedMissions));
      /** Caso seja encontrado algum erro no tratamento dos dados, exibe um console log  */
      } catch (error) {
        console.log('Erro ao carregar os dados:', error);
      }
    };
    /** carrega os dados  */
    loadData();
  }, []);
  
  /** Sempre que existe uma mudança em points ou missions esse codigo é renderizado */
  useEffect(() => {
    const saveData = async () => { /** Constante assicrona que vai salvar os dados */
      try {
        /** Converte os arrays de missoes e pontos em strings JSON e salva nas determinadas chaves */
        await AsyncStorage.setItem('missions', JSON.stringify(missions));
        await AsyncStorage.setItem('points', JSON.stringify(points));
        await AsyncStorage.setItem('completedMissions', JSON.stringify(completedMissions));
        /** Notifica possivel erro */
      } catch (error) {
        console.error('Erro ao salvar os dados:', error);
      }
    };
    /** Evita salvar dados vazios */
    if (missions.length > 0 || points !== 0) {
      saveData(); 
    }
  }, [missions, points, completedMissions]);

  /** useEffect realiza efeitos fora da renderização depedente ao points, quando o point muda animção é feita */
  useEffect(() => {
    Animated.timing(pointsAnimation, { /** Animação linear no tempo */
      toValue: points, /** Valor onde a animação vai terminar */
      duration: 600, /**Duração da animação em milisegundos */
      useNativeDriver: true, /** Perimite que a animação seja realizada nativamente pelo computador */
    }).start();
    Animated.sequence([ /** Sequencia de animações */
      Animated.timing(scaleAnimation, {
        toValue: 1.5, // Aumenta o tamanho ate 1.5 do original
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1, // Volta ao tamanho normal 
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [points]);

  /** Como cada missão é adicionada como um botão ao apertar a missão a função é chamada */
  const handleMissionPress = (missionId: string, missionName: string) => {
    /** Exibi um alerta do sistema com mensagens e opções de botão */
    Alert.alert(
      `Escolha uma ação`,
      `O que deseja fazer com "${missionName}"?`,
      /** Cria um menu com essas 3 opções */
      [
      /** Aparece um alerta concluindo a missão */
      { text: "Concluir", onPress: () => {
        /** Map percorre cada item da lista e verifica se o id da missao e o mesmo da que foi clicada (acionando a função handle...)
         se for o estado completed é mudado para true*/
        setMissions(missions.map(mission => mission.id === missionId ? { ...mission, completed: true } : mission));
        /** aqui mission recebe o resultado de find, que procura na lista missions um item com o mesmo id de middiosId
         da missão clicada. Então o if verifica se mission existe (find deu certo) e se mission.completed = true
         caso isso bata setpoints é chamado para mudar o valor de points, para o valor antigo + 10 */
        const mission = missions.find( m => m.id === missionId );
        if (mission && !mission.completed) {
          setPoints(prevPoints => prevPoints + 5);
          setCompMissions(prevcompletedMissions => prevcompletedMissions + 1);
          }
        }
      },
      /** Exclui a missão da lista setMission */
      /** Filter vai copiar a lista com a condição dada, no caso se o id da mission for diferente da missão clicada
       que virou parametro de handlle... essa missao estar na nova lista, setmission vai definir que a lista recebea a nova lista*/
      { text: "Excluir", onPress: () => setMissions(missions.filter(m => m.id !== missionId)), style:"destructive"},
      /** Fecha o menu sem fazer nada */
      { text: "Cancelar", style: "cancel" }
      ]
    )
  };

  /** Nova função */
  const addMission = () => {
    /** Verifica se a variavel newmission esta vazia, caso esteja o sistema alerta e a função é parada (trim tira os espaços antes e dps)*/
    if (newMissionName.trim() === ('')) {
      alert("Insira um nome para a missão.");
      return;
    }
    /** Else altera a array missions, para uma nova array com os itens antigos copiados, mas com um novo adicionado
    novo item recebe o id relacionado ao datenow que gera um número baseado no tempo real em ms
     a quantidade de ids, o nome da variavel newmission digitado no input e o estado de incompleta  */
    setMissions([...missions, { id: String(Date.now()), name: newMissionName, completed: false}]);
    /** apos isso a variavel new mission é zerada para que se possa digitar outra missão */
    setNewMissionName('');
  };

  const resetPoints = async () => { 
    //função para zerar os pontos, objetivo de auxiliar no design dos níveis
    await AsyncStorage.setItem('points', JSON.stringify(0)); 
    //salva um valor no armazenamtno local
    //é necessario converter o número para string pois async so aceita string
    setPoints(0);
  };

  //resetPoints(); //chama a função, so precisa retirar o comentário

  const evolvePoints = async() => {
    //função para aumentar os pontos, auxiliar no design
    await AsyncStorage.setItem('points', JSON.stringify(0));
    setPoints(800);
  };

  //evolvePoints(); //chama a função

  return (
    
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>

      {/* Titulos Principais da página */}
      <Text style={[styles.header, isDarkMode && styles.darkText]}>{t('missions')}</Text>
      <Text style={[styles.subHeader, isDarkMode && styles.darkText]}>{t('pending_missions')}</Text>

      {/* lista onde esta a lista atual de objetivos a ser comprida
      Flatlist usada para criar uma lista que le dados de uma lista e renderiza esses dados*/}
      <FlatList
        style = {{marginTop: 15}}
        data={missions} /** Conteudo da lista, fazendo referencia a lista */
        keyExtractor={(item) => item.id} /** Cada item recebe um identificador unico referente ao seu número */
        renderItem={({ item }) => ( /** Para cada item da lista será exibido um componente touchableop com o text do item */
          <TouchableOpacity onPress={() => handleMissionPress(item.id,item.name)}>
          <Text
            style = {[
              styles.goals,
              /** Estilo condicional se a missão esta true e o estilo completed é aplicado */
              item.completed && styles.completed,
            ]}
            >{item.name}
          </Text>
          </TouchableOpacity>
        )}
        /** Separa os itens de uma lista, nesse caso cria uma linha de 1px, cinza claro e cria margens top e bot de 5px */
        ItemSeparatorComponent={() => 
          <View style = {{height: 1, backgroundColor: '#ccc', marginVertical: 5}}/>
        }
      />

      {/* Onde mostra os pontos atuais, texto animado */}
      <Animated.Text
      style = {[styles.points, {
        /** Define propriedades dinammicas, interpolar valores numericos, transições suaves */
        opacity: pointsAnimation.interpolate({
          inputRange: [0, points],
          outputRange: [0.5, 1] /** Opacidade quando o valor de points for 0/ quando for = points */
        }),
        transform: [{ scale: scaleAnimation }], /** aplica a animação de transofrmação do scale do objeto */
        color: isDarkMode ? '#f4f4f9' : '#ff4500', //o operador ? determina que se isDarkMode true usa o primeiro valor e falso o outro
      }]}
      >
        {t('points')} {points}
      </Animated.Text>

      {/** Input de texto para digitar algo */}
      <TextInput
        style = {styles.input}
        placeholder={t('mission_name')} /** Nome que aparece no input */
        value= {newMissionName} /** Liga o valor original do input para a variavel newmission vazia */
        onChangeText={setNewMissionName} /** Atualiza o valor da variavel newmission para o que for digitado */
      />


      {/* Botão para adicionar metas */}
      <TouchableOpacity 
        style = {[
          styles.customButton,
          {marginBottom:45},
        ]} 
        /** Ao pressionar o botão chama a função addmission com o tetxo digitado */
        onPress = {addMission}> 
        <Text style={styles.buttonText}>{t('add_mission')}</Text>
      </TouchableOpacity>

      <View style = {[{flexDirection:'row', width:'100%',justifyContent:'center', gap: 20,}]}>
        {/** Botão que ao pressionado chama a função navigation com o intuito de mudar para a tela de config. */}
        <TouchableOpacity style={[styles.navButtonCo, isMedium && {width:'auto'}]} onPress={() => navigation.navigate('Configurações') }>
          <Text style={styles.navButtonText}>{t('settings')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {[styles.navButtonNi, isMedium && {width:'auto'} ]} onPress={() => navigation.navigate('Níveis') }>
          <Text style={styles.navButtonText}>{t('go_levels')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {[styles.navButtonSt, isMedium && {width:'auto'}]} onPress={() => navigation.navigate('Estatísticas') }>
          <Text style={styles.navButtonText}>{t('go_stats')}</Text>
        </TouchableOpacity>
      </View>

      {/* Controle da visualização da barra de status do dispositivo */}
      <StatusBar style="auto" />

    </View>
  );
  
}

const styles = StyleSheet.create({

  container: {
    flex: 1, /** A div principal ocupa a página interia */
    backgroundColor: '#f4f4f9',
    alignItems: 'center', /** Alinhar os intens verticalmente no centro */
    justifyContent: 'flex-start', /** Alinhas os itens horizontalemnte no centro */
    paddingTop: 35, /** Preenchimento interno */
  },

  header: {
    color: '#3f2a8c',
    fontWeight: 'bold',
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
    fontSize: 40,
  },

  darkCont: {
    backgroundColor: '#333',
  },

  darkText: {
    color: '#fff',
  },

  subHeader: {
    color: '#f29c11',
    fontWeight: 'bold',
    fontSize: 22,
  },

  goals: {
    fontSize: 20,
    color: '#3f2a8c',
  },

  points: {
    color: '#ff4500',
    marginTop: 30,
    marginRight:25,
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-end', /** Alinhar o proprio objeto verticalmente no centro */
    paddingRight: 30,
  },

  customButton: {
    backgroundColor: '#ff4500',
    paddingVertical: 15,
    paddingHorizontal: 22,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },

  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  /** Estilo que aparece so pra missoes depois de dadas como completadas */
  completed: {
    textDecorationLine: 'line-through',
    color:'#b8860b',
    opacity: 0.8,
  },

  /** Estilo do Input de Texto */
  input: {
    width:'80%',
    height:40,
    borderColor: '#ccc',
    borderWidth:1,
    borderRadius:5,
    paddingHorizontal: 10,
    marginTop:20,
    backgroundColor: '#fff',
  },

  navButtonCo: { 
    backgroundColor: '#3f2a8c', 
    padding: 10, 
    borderRadius: 8, 
    marginTop: 10, 
    marginBottom: 35,
    alignItems:'center',
  },

  navButtonNi: { 
    backgroundColor: '#3f2a8c', 
    padding: 10, 
    borderRadius: 8, 
    marginTop: 10, 
    marginBottom: 35,
    alignItems:'center',
  },

  navButtonSt: { 
    backgroundColor: '#3f2a8c', 
    padding: 10, 
    borderRadius: 8, 
    marginTop: 10, 
    marginBottom: 35,
    alignItems:'center',
  },

  navButtonText: { 
    color: '#fff', 
    fontSize: 18 
  },

  darkContainer: {
    backgroundColor: '#333',
  },

});
