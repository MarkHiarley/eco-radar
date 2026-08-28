# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- População que vive em áreas de risco de incêndio florestal: quer saber se há foco perto da própria localidade e tempo para evacuar/proteger a família e bens.
- Órgãos públicos e ambientais: precisam de dados em tempo real para avisar a população e agir rápido contra focos não combatidos.

## Product Purpose

Monitorar em tempo real focos de incêndio florestal no Brasil integrando dados de satélite da NASA (FIRMS) e notificar usuários quando um foco é detectado perto da localidade cadastrada — reduzindo danos sociais, ambientais e econômicos. Alinhado à ODS 13 (ação contra a mudança global do clima). Sucesso = detecção rápida, aviso antecipado, menos área queimada.

## Positioning

Sistema com interface intuitiva que combina três coisas que juntas diferenciam: dados de satélite de alta precisão da NASA FIRMS em tempo real, cadastro da localidade do próprio usuário (tornando o monitoramento preciso e pessoal), e alerta inteligente de proximidade que notifica antes do incêndio alcançar a pessoa, dando tempo de se proteger.

## Operating Context

- App mobile (MIT App Inventor) e web (Next.js) consumindo a API pública eco-radar (Fastify + NASA FIRMS + Firebase RTDB).
- Usuário cadastra propriedade/localidade com nome e raio de alerta; sistema avisa quando um foco cai dentro do raio.
- Fluxo atual do site: landing → login Google (next-auth) → páginas internas.

## Capabilities and Constraints

- Mapa interativo com focos ativos (cor por intensidade FRP), dados históricos + NRT recentes da NASA, alertas por proximidade, chatbot de IA.
- Integração FIRMS via MAP_KEY; limite de resposta do App Inventor (~1MB) amostra dados no backend.
- Repo web: Next.js 15 app router, Tailwind 4, styled-components, react-leaflet, next-auth (Google), VLibras.
- Tem deploy/monitoramento pendente da landing (repo em produção não confirmado — "desenvolvimento" é placeholder).

## Brand Commitments

- Nome: EcoRadar. Tema: incêndios florestais, satélite, Brasil.
- Paleta pinada pelo usuário (28/08/2026): **branco (core) + laranja + amarelo**, "tipo chamas de fogo". As cores de fogo são as únicas saturadas; texto/preenchimento em grafite/quase-preto sobre o branco.
- Mundo visual aprovado: **A Sentinela** — torre de vigia de incêndio × mapa topográfico (curvas de nível, malha de coordenadas, rotulação de mapa).
- Assets existentes: `src/app/assets/brasil-de-pontos.png` (Brasil pontilhado, do projeto original), `ecoradar-icone.png`, pins amarelo/laranja/roxo/vermelho (severidade FRP), google-logo.png.

## Evidence on Hand

- +79% de áreas queimadas no Brasil em 2024 vs 2023 (dados do brief da equipe).
- +30 milhões de hectares devastados (área maior que a Itália).
- Integração com o serviço FIRMS da NASA (dados de satélite de alta precisão).
- ODS 13: ação contra a mudança global do clima.

## Product Principles

- Prove com dados reais: números e mapas ao vivo valem mais que promessas.
- Proteção pessoal primeiro: alertar antes do fogo chegar é a promessa central.
- Simplicidade de leitura para leigos e órgãos públicos: interface intuitiva.
- Transparência de fonte: os dados vêm da NASA, o usuário precisa confiar na origem.

## Accessibility & Inclusion

- Não estabelecido pelo produto; VLibras (libras) já está presente no site atual. Desired: manter acessibilidade básica (contraste, foco, texto alternativo), idioma pt-BR.