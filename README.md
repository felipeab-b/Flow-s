# Aplicativo de Acompanhamento de Metas Gamificado - Flows

Este aplicativo permite que os usuários acompanhem suas metas por meio de um sistema de missões, onde o progresso é acompanhado por pontos. A cada missão completada, o usuário recebe pontos.

## Funcionalidades

- **Criação de missões**: Os usuários podem criar suas próprias missões com objetivos personalizados.
- **Sistema de pontos**: O usuário acumula pontos conforme conclui suas missões.
- **Salvamento de dados**: As missões e os pontos são salvos usando o AsyncStorage, garantindo que os dados não sejam perdidos ao fechar o aplicativo.
- **Navegação entre páginas**: O aplicativo permite navegar entre diferentes páginas, facilitando a organização e visualização das metas.
- **Dark Mode**: O aplicativo tem a funcionalidade de mudar de tema entre light mode e dark mode.
- **Troca de Idioma**: É possível trocar o idioma do app entre português e inglês.
- **Tela de Níveis**: Uma tela onde mostra o seu nível baseado na quantidade de pontos do cliente, com um design único para cada nível
- **Tela de Estátisticas**: Tela que mostra algumas estátisticas do app como quantidade total de pontos e quantidade de missões completas
- **Responsividade**: O app foi adaptado para mudar seu layout dependendo da tela de visualização, porém essa funcionalidade ainda tem suas limitações.

## Tecnologias Usadas

- **React Native**: Framework para desenvolvimento de aplicativos móveis.
- **TypeScript**: Para adicionar tipagem estática ao código e garantir maior segurança.
- **AsyncStorage**: Para salvar dados localmente no dispositivo.
- **React Navigation**: Para gerenciar a navegação entre as páginas do aplicativo.

## Pré-requisitos

1. **Node.js**: Instale a versão mais recente do Node.js a partir de [nodejs.org](https://nodejs.org/).
2. **Expo CLI**: Instale o Expo CLI globalmente com:
   ```bash
   npm install -g expo-cli

## Dificuldades

É o primeiro código em TypeScript que escrevo logo tive algumas estranhezas quanto a alguns termos e a sintaxe, além disso tive muita
dificuldade para entender bem as partes relacionadas à animação e salvamento de dados.

~~Responsividade, fiz todos os testes de layout em um tablet logo quando tentei abrir no celular a página se desorganizou inteira~~

Consegui configurar a responsavidade do app de forma quase aceitável, restando ainda algumas ressalvas. Outra dificuldade foi tratar o input, pois ao escrever o teclado tampa o input.

Não consegui criar os arquivos PWA para uma possível distribuição.

## Futuro

 ~~Próximos objetivos são: adicionar funcionalidades à tela de configurações, adicionar uma tela de estatísticas e suas funcionalidades, adicionar uma tela de níveis e suas funcionalidades e configurar o salvamento de dados em todas essas páginas.~~ 

~~Ainda é necessário adicionar uma tela de estatísticas e a tela de níveis e suas funcionalidades. Além de uma funcionalidade de perfil.~~

~~Em próximas atualizações pretendo implementar a responsividade, e estudar uma possível distribuição~~

Depois desejo aumentar a quantidade de stats mostrada como tempo médio para realizar missão, missão mais rápida e um gráfico de quantidade de missões diárias. Além de implementar designs mais profissionais nos níveis. E por fim, melhorar de forma final o design do app como um todo. Será necessário configurar a responisvidade de forma eficiente assim como aprimorar o código futuramente.




