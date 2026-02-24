# PluView Landing Page

## O que isso faz?

Landing page institucional que apresenta o projeto PluView — uma estação de monitoramento climático IoT autossustentável para agricultura de precisão.

**Funcionalidades:**
- Hero section com vídeo de fundo, slogan de impacto e estatísticas
- Seção "Sobre" com contexto, timeline e comparativo problema/solução
- Grid de 8 funcionalidades do sistema IoT com destaques visuais
- Galeria de fotos com descrições detalhadas dos locais de teste
- **Mapa interativo do Brasil** mostrando trajeto da sede (CITAP, Pompeia-SP) até a prova de conceito (Fazenda Progresso, Piauí)
- Seção "Próximos Passos" com roadmap de evolução do projeto
- **Carrossel infinito de parceiros** (Grupo Progresso, Instituto Cultivar Progresso, Fundação Shunji Nishimura, CITAP, LMPP)
- Cards da equipe com links para LinkedIn (7 desenvolvedores + 3 orientadores)
- Sistema de agendamento de reuniões integrado ao Google Calendar/Meet
- Formulário de contato com envio via Gmail
- Sistema de tema claro/escuro (automático por horário ou manual)
- Design responsivo para mobile, tablet, notebook e desktop
- Animações fluidas com Framer Motion

---

## O que é?

É uma **aplicação web** (Single Page Application). Uma landing page institucional desenvolvida em React que serve como vitrine do projeto PluView para apresentar a solução de IoT agrícola a potenciais parceiros, investidores e interessados.

---

## Quais tecnologias são usadas?

- **React** 18.3.1 — Biblioteca de UI
- **TypeScript** 5.6.2 — Tipagem estática
- **Vite** 6.0.1 — Build tool e dev server
- **Tailwind CSS** 3.4.15 — Framework CSS utility-first
- **Framer Motion** 11.15.0 — Animações fluidas
- **Leaflet** 1.9.4 + **React Leaflet** 4.2.1 — Mapa interativo
- **D3.js** 7.9.0 — Visualização de dados
- **React Intersection Observer** 9.13.1 — Animações on-scroll
- **Lucide React** 0.468.0 — Ícones SVG
- **ESLint** 9.15.0 — Linting de código

---

## Qual é a ambição do projeto?

Este projeto **será lançado em produção** como site oficial do PluView. A landing page é parte da estratégia de divulgação do projeto de IoT agrícola desenvolvido no CITAP (Fatec Pompeia) em parceria com o Instituto Cultivar Progresso.

O PluView coleta 5 variáveis climáticas em tempo real, de forma autossustentável (energia solar) e conectada (IoT), permitindo gestão hídrica inteligente para o agronegócio brasileiro.

---

## Qual é o estágio do projeto?

**Status: Completo**

**O que está feito:**
- Hero section com slogan "Onde os dados encontram o campo"
- Logo personalizada SVG (gota + ondas IoT)
- Seção About focada em monitoramento inteligente e 5 variáveis climáticas
- Grid de funcionalidades com destaques visuais
- Galeria de fotos (Fazenda Progresso, Instituto Cultivar Progresso, Equipe)
- **Mapa interativo com Leaflet** mostrando trajeto SP → PI (~1.755 km)
- Seção Roadmap com visão de futuro do projeto
- **Seção de parceiros com carrossel infinito animado**
- Cards da equipe centralizados com links LinkedIn
- Sistema de agendamento com calendário funcional e integração Google Meet
- Formulário de contato com sanitização de inputs e validação
- Footer com links para Instituto Cultivar Progresso, Grupo Progresso, Fundação Shunji Nishimura e GitHub
- Sistema de tema claro/escuro harmonioso e elegante
- Responsividade completa (mobile, tablet, notebook, desktop)
- Meta tags SEO e Open Graph
- Configuração para deploy no Vercel
- Build de produção otimizado

**O que está pendente:**
- Nenhum item pendente para a versão 1.0

---

## Problemas conhecidos ou coisas que não são feitas corretamente?

1. **Agendamento de reuniões** — O sistema redireciona para o Google Calendar do usuário. O convite é enviado automaticamente para `fhservicesofc@gmail.com` quando o usuário confirma o evento.

2. **Links de instituições externos** — Os links para parceiros apontam para domínios externos que podem sofrer alterações.

3. **Orientador sem LinkedIn** — Reinaldo Bernardi não possui link para perfil LinkedIn cadastrado.

4. **Fotos da equipe** — São exibidas as iniciais dos membros com gradiente colorido (não utiliza fotos externas).

5. **Mapa interativo** — Requer conexão com internet para carregar tiles do CartoDB.

---

## Instalação

```bash
# Clone o repositório
git clone https://github.com/FhSoftwareSolutions/pluview-landing.git
cd pluview-landing

# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

---

## Deploy no Vercel

O projeto já está configurado para deploy no Vercel. Basta:

1. Conectar o repositório ao Vercel
2. O Vercel detectará automaticamente as configurações do `vercel.json`
3. Clique em "Deploy"

Ou via CLI:
```bash
npm i -g vercel
vercel
```

### Configurações do Vercel

O arquivo `vercel.json` inclui:
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Headers de segurança (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection)
- Cache para assets estáticos
- Rewrites para SPA routing

---

## Estrutura do Projeto

```
src/
├── components/
│   ├── AnimatedMap.tsx   # Mapa interativo com Leaflet
│   ├── ContactForm.tsx   # Modal de contato com calendário
│   ├── Icons.tsx         # Ícones SVG personalizados
│   ├── Navbar.tsx        # Navegação responsiva
│   ├── SectionTransition.tsx
│   └── ThemeToggle.tsx   # Alternador de tema
├── sections/
│   ├── Hero.tsx          # Seção inicial com vídeo
│   ├── About.tsx         # História e contexto
│   ├── Features.tsx      # Funcionalidades IoT
│   ├── Gallery.tsx       # Fotos e mapa do projeto
│   ├── Roadmap.tsx       # Próximos passos
│   ├── Partners.tsx      # Carrossel de parceiros
│   ├── Team.tsx          # Equipe
│   ├── CTA.tsx           # Call-to-action
│   └── Footer.tsx        # Rodapé
├── hooks/
│   └── useTheme.tsx      # Hook de tema
├── App.tsx
├── main.tsx
└── index.css             # Estilos e variáveis de tema

public/
├── imgs/                 # Imagens do projeto
│   └── logo-lmpp.jpg     # Logo LMPP
└── vids/                 # Vídeos do projeto
```

---

## Parceiros

- [Grupo Progresso](https://www.grupoprogresso.agr.br/)
- [Instituto Cultivar Progresso](https://institutocultivar.com.br/)
- [Fundação Shunji Nishimura](https://fsnt.org.br/)
- [CITAP](https://citap.org.br/)
- [LMPP - Fatec Pompeia](https://lmpp.fatecpompeia.edu.br/)

---

## Equipe

**Desenvolvedores:** João Vinnycius (Coordenador), Lucas Gonçalves (Dados & Web), Gustavo Seidi Hono (Hardware & BD), Luís Otávio (Hardware), Jonah Kunihiro (Gestão), Andreas Berti (Documentação), Mateus Robers (Software)

**Orientadores:** Stephen Kunihiro, Hannes Fischer, Reinaldo Bernardi

---

## Licença

Este projeto é proprietário do Instituto Cultivar Progresso e parceiros.

---

Desenvolvido por [Lucas Gonçalves](https://www.linkedin.com/in/lucas-gon%C3%A7alvessz/)
