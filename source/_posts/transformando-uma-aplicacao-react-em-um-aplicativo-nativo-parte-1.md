---
title: Transformando uma aplicação React em um aplicativo nativo (Parte 1)
date: 2020-08-10 22:51:44
bio: A origem do problema em questão e como resolvemos.
tags: 
	- React
	- React Native
categories:
  - artigos
---


*Separei esse artigo em duas partes. A primeira que você está lendo agora trata-se da origem do problema em questão e como resolvemos. Na outra parte entro mais afundo e crio do zero essa estrutura explicando passo a passo.*

Alguns meses atrás, por causa de uma necessidade aqui na Red Ventures (onde trabalho atualmente), me deparei com essa pergunta:
> # Como transformar uma aplicação React em um aplicativo (iOS e Android) de uma maneira rápida, que aproveite o codebase atual e seja escalável?

Logo de cara, notamos que seria necessário usar um *browser* para renderizar a aplicação já existente e alguma ferramenta para gerar tanto o aplicativo Android como o iOS com a mesma codebase, mas ainda existiam algumas dúvidas:

* A aplicação está em constante mudança. Desse modo, faz sentido uma soluçao como Cordova/Phonegap, que para qualquer alteração seria necessário soltar uma atualização na loja?

* Caso a aplicação tenha engajamento, como faremos para escalar para um aplicativo nativo sem precisar matar tudo de uma vez e começar do zero? Como faremos essa transição gradual caso for preciso?

## Testando soluções

A partir daí, comecei a realizar algumas pesquisas e fazer algumas POC’s.

![](https://cdn-images-1.medium.com/max/2000/0*hC1TjdmGFkZNFYEk)

Por não facilitar a atualização do aplicativo e não ser escalável para uma experiência nativa, concluímos em não seguir com Cordova/Phonegap, mas ir para um caminho que tivesse esses benefícios. Porém, nossa aplicação web, apesar de já estar preparada para uso mobile, ainda precisava de alguns ajustes para o uso em aplicativo, como por exemplo uma tela inicial específica.

Então resolvemos gerar duas aplicações com o mesmo processo de build existente da aplicação web, por exemplo:
> *Aplicação já existente: [https://meusite.com.br/](https://meusite.com.br/)*
> *Nova aplicação: [https://meusite.com.br/app/](https://meusite.com.br/app/)*

As duas aplicações seguiram exatamente com o mesmo codebase, a única diferença foi a necessidade de disponibilizar uma variável global dentro da aplicação em tempo de *build* informando o valor "App" ou "Web", o que na prática foi só adicionar mais um passo no processo de *build/deploy*. Com isso foi possível criar condições como qual tela inicial mostrar.

## React Native

![](https://cdn-images-1.medium.com/max/2000/0*NgtuJZI8475e7pa0.png)

Com a parte web resolvida e depois de alguns outros testes, decidi fazer uma POC com React Native (uma ferramenta do Facebook que muita gente conhece ou já ouviu falar), pois resolveria o problema da geração do app para Android e iOS e eu já tinha um conhecimento básico prévio. Em menos de uma hora, a POC já tinha atendido quase todas as necessidades, mas ainda faltava uma coisa para fechar a solução: a comunicação entre o nativo e o *browser.*

Olhando a documentação da ferramenta, descobri que quando o React Native monta um componente WebView, ele sempre injeta um método chamado ReactNativeWebView.postMessageno window da página que foi carregada, dessa maneira eu consegui fazer minha aplicação web passar informações para o nativo e vice-versa.

Olha só essa lista de coisas que foram possíveis fazer por causa dessa comunicação:

* Escalabilidade. Posso agora ter em paralelo tanto telas nativas feitas diretamente no React Native como telas da aplicação web

* Escutar o evento de backPressque é disparado quando o botão de voltar do celular é acionado

* Usar o push notification

* Usar as *features* de biometria, como o *faceId*

* Executar qualquer outra função nativa

## Conclusão

![](https://cdn-images-1.medium.com/max/2000/0*Mn6YEQbshFyZopQp)

Essa solução resolveu muito bem o problema e espero que ajude na criação de novas soluções para quem está lendo!

Vou deixar abaixo o link para o próximo post, onde irei mostrar como construir do zero, passo a passo, toda a estrutura que eu descrevi ao longo desse artigo, com uma aplicação web que utilizará React, mas que pode ter como base qualquer outra biblioteca ou até mesmo vanilla.

[Próximo post](/transformando-uma-aplicacao-react-em-um-aplicativo-nativo-parte-2)
