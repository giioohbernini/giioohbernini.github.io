---
title: Transformando uma aplicação React em um aplicativo nativo (Parte 2)
date: 2020-08-10 22:51:44
bio: Criando a arquitetura do zero, explicando passo a passo.
tags: 
	- React
	- React Native
categories:
  - artigos
---


*Separei esse artigo em duas partes. Na segunda parte que você está lendo agora, entrarei mais afundo e criarei do zero a arquitetura, explicando passo a passo. Na primeira parte, eu mostro a estrutura de pensamento, que pode ajudar a entender se essa estratégia irá se adequar ao seu caso.*

## Iniciando o projeto

Para essa primeira parte vamos precisar criar dois projetos, um para a aplicação web que será feita em React e outro para a aplicação nativa que será feita com React Native.

Não será abordado o setup inicial para rodar as aplicações React e React Native, mas você pode ler sobre isso [aqui](https://react-native.rocketseat.dev/).

Para este artigo, eu criarei somente um repositório no Github, mas em um caso real onde terá outras pessoas codando, eu prefiro quebrar em dois repositórios para ficar mais organizado.

*No fim deste artigo há a URL para o repositório, caso queira pular o passo a passo.*

## Criação da aplicação web (React)

Para facilitar a criação desse artigo e não misturar com outros assuntos e conceitos, irei usar o CRA (create-react-app) para iniciarmos um projeto React.

Vamos lá!

`npx create-react-app web`

Com o projeto criado, iremos colocar variáveis de ambiente no script de *start* e *build* para diferenciarmos nossa aplicação web e nativa quando precisarmos e adicionar um arquivo de estilos já pronto que vou deixar disponível [aqui](https://raw.githubusercontent.com/giioohbernini/web-to-native/master/web/src/index.css). Basta copiar e salvar no arquivo index.css.

<script src="https://gist.github.com/giioohbernini/de7175b56e3235dbef3d3d3e6410f1ba.js"></script>

Agora precisamos criar um útil para recebermos essa informação, então irei criar uma pasta *utils*, e um arquivo chamado isApp.js com o seguinte código:

<script src="https://gist.github.com/giioohbernini/b1dfa7c81fc1b02c838b87968689344d.js"></script>

Com isso pronto, irei adicionar o react-router-dom para criarmos nossas rotas. Caso queira se aprofundar na biblioteca, você pode encontrar mais informações [aqui](https://reactrouter.com/web/guides/quick-start).

yarn add react-router-dom ou npm install react-router-dom

Arquivo: App.js

<script src="https://gist.github.com/giioohbernini/019e0493566af65f963d94921b537448.js"></script>

Como mostrado nó código acima, separei em outros arquivos o Root, Home e About para deixar mais organizado.

\> Arquivo: ./pages/Home/index.js

<script src="https://gist.github.com/giioohbernini/66aa38856d3de7b281941f7946b4b160.js"></script>

\> Arquivo: ./pages/About/index.js

<script src="https://gist.github.com/giioohbernini/07f26a9c06d6e159eb17a625e4041776.js"></script>

\> Arquivo: Root.js

<script src="https://gist.github.com/giioohbernini/b8afe3f7617a3eec18212fea19ec554e.js"></script>

No código acima, importei um módulo que eu criei chamado postMessage. Esse módulo tem a responsabilidade de se comunicar diretamente com o lado nativo via o método ReactNativeWebView.postMessage, que é inserido no window, assim usamos ele para sempre avisar o aplicativo nativo quando uma rota foi alterada e qual é a nova rota atual. Mais para baixo irei mostrar um caso real de onde podemos usar essa informação.

\> Arquivo: utils/postMessage.js

<script src="https://gist.github.com/giioohbernini/cf79a525b73f83d960a8c64ea87a680c.js"></script>

Com essa comunicação podemos fazer várias outras coisas, como alternar entre uma página nativa e uma página web por exemplo.

## Criação da aplicação nativa (React Native)

Agora com a parte web já preparada, podemos criar o nosso projeto React Native!

O comando abaixo vai iniciar o projeto, ele pode demorar um pouco dependendo da sua conexão.

`npx react-native init app --template react-native-web-to-native-template`

Reparem no parâmetro --template, onde eu passo o nome do boilerplate que deixei preparado com algumas coisas que iremos precisar.

Com o projeto criado, iremos abrir o arquvio webview.js que se encontrará no caminho src > constants > webview.js para atualizarmos a URL inicial do aplicativo o rootUrl. Como estamos trabalhando localmente, iremos colocar localhost com a porta default que o CRA criou para nossa aplicação web que foi a 3000, ficando dessa maneira abaixo:

`export const rootUrl = 'http://localhost:3000/'`

Agora iremos rodar o projeto e ver como está!

yarn ios ou yarn android

![](https://cdn-images-1.medium.com/max/2000/1*AwVNfRN5CVMqATaR_-17Zw.png)

Com o nosso aplicativo rodando, agora podemos perceber no topo da tela que a barra superior do sistema não bate com a cor da aplicação. De acordo com o estilo já adicionado no começo do artigo, as cores são:

<script src="https://gist.github.com/giioohbernini/79e117c561ea63adff7461bfeb47df4a.js"></script>

Com isso, iremos usar a informação que mandamos via postMessage para conseguir manipular a cor do sistema conforme a página atual. Mas antes, iremos ver como a comunicação via postMessage funciona do lado do aplicativo e, para ficar claro, terei que passar por alguns arquivos.

\> Trecho do arquivo: src/pages/Main/index.js (A página que renderiza o WebView)

<script src="https://gist.github.com/giioohbernini/38d1c04048798b12c9af9b23a8c923c6.js"></script>

No trecho acima, podemos perceber o uso do onMessage, o callback que o componente WebView irá chamar quando o método ReactNativeWebView.postMessage for executado. No nosso caso estamos passando o handleOnMessage como callback, então vamos ver o que ele está fazendo.

\> Trecho do arquivo: src/pages/Main/hooks/useWebview.js (Um custom hook que estamos chamando no src/pages/Main/index.js)

<script src="https://gist.github.com/giioohbernini/057eec349f0429956fa55be510e776fa.js"></script>

No nosso *callback,* recebemos o evento e conseguimos extrair a informação que foi passada da nossa aplicação web acessando o event.nativeEvent.data. Como enviamos um *json *formatado como *string,* pois o postMessage só aceita *string*, agora podemos transformar nossa *string* para *json* de volta.

O messageEvents faz um papel bem importante de roteamento. Como o método que estamos usando para comunicação não nos fornece nenhuma estrutura (ele apenas transmite texto de um lado para o outro), foi preciso criar essa estrutura de roteamento para facilitar a nossa vida e deixar mais organizado. Na nomenclatura vou usar o termo event para facilitar o entendimento.

\> Arquivo: src/utils/messageEvents/index.js

<script src="https://gist.github.com/giioohbernini/eb5e9551db3e0d07278822dc31e9dbcc.js"></script>

Como mostrado acima, usei [RamdaJS](https://ramdajs.com/) para criar essa estrutura (também poderia ser feita com switch case), que pega a propriedade eventName passada da aplicação web e endereça a função que vai receber e lidar com os dados. No caso atual estamos lidando somente com o routeChange que criamos, então vamos entender o que ele está fazendo.

\> Arquivo: src/utils/messageEvents/routeChange.js

<script src="https://gist.github.com/giioohbernini/d3b6b6340df0705d9dc76bec858f93db.js"></script>

O routeChange verifica se o href existe e, caso exista, ele atualiza o estado que informa a url atual e também atualiza o status do canGoBack, que é quem controla se o app pode ou não fechar em uma ação de voltar.

Com tudo isso pronto e explicado, agora temos a informação da url atual no lado do *React Native* e podemos manipular a cor do sistema para que sempre fique igual ao topo da aplicação web.

\> Arquivo: src/pages/Main/hooks/propsMapper.js

<script src="https://gist.github.com/giioohbernini/bcd0546c3680cad1faa33133896d3f9f.js"></script>

No custom hooks acima, pegamos a url atual que é passada para ele, extraimos a url limpa de *query strings* e passamos para a função getUrlToStatusBarColor, que está mapeando as urls e as respectivas cores e então retornamos isso diretamente para o componente Main que vai passar para o componente StatusBar.

\> Trecho do arquivo: src/constants/webview.js

<script src="https://gist.github.com/giioohbernini/0631b3cde4f8533035490ea5f16d4aa3.js"></script>

Estamos adicionando no código acima as cores no mapa por url.

\> Trecho do arquivo: pages/Main/index.js

<script src="https://gist.github.com/giioohbernini/d413959c14ef76dfe29000446557960c.js"></script>

No código acima, passamos a propriedade da cor para o StatusBar e para o SafeAreaView para de fato fazer as cores alterarem, vamos ver como ficou! Se você já estiver com o projeto rodando é só atualizar, se não tiver é só rodar o yarn ios ou yarn android ou olhar o gif abaixo:

<img style="width: 350px" src="https://cdn-images-1.medium.com/max/2000/1*FDNzg5mc5c2ZZgEt78gs4A.gif" />

[Repositório](https://github.com/giioohbernini/web-to-native) com o código que desenvolvemos aqui nesse artigo.

## Conclusão

Encerro por aqui esse artigo, mas se quiser saber mais sobre essa implementação, leia a [primeira parte desse post](https://medium.com/@giovannibernini/como-transformar-uma-aplica%C3%A7%C3%A3o-web-react-em-um-aplicativo-nativo-da-noite-para-o-dia-6116b247f069), onde mostro como chegamos nessa solução, o motivo e os ganhos que você pode ter caso esteja em um cenário parecido.

Espero que consigam adaptar no cenário de vocês e qualquer dúvida ou sugestão estarei respondendo os campos de comentários, obrigado!

## Links úteis

[Método postMessage que o React Native injeta no window](https://github.com/react-native-community/react-native-webview/blob/master/docs/Reference.md#injectedjavascript)
[Parâmetro onMessage do componente WebView](https://github.com/react-native-community/react-native-webview/blob/master/docs/Reference.md#onmessage)
[Repositório com o código do artigo](https://github.com/giioohbernini/web-to-native)
[Método postMessage do componente WebView](https://github.com/react-native-community/react-native-webview/blob/master/docs/Reference.md#postmessagestr)
[Parte um desse artigo](https://medium.com/@giovannibernini/como-transformar-uma-aplica%C3%A7%C3%A3o-web-react-em-um-aplicativo-nativo-da-noite-para-o-dia-6116b247f069)
