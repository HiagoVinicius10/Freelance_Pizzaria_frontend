# Pizzaria Cardoso — Front-end

Aplicação web desenvolvida para o gerenciamento de pedidos de uma pizzaria, com uma interface intuitiva e organizada para facilitar as operações do dia a dia.

O projeto faz parte de um sistema de pizzaria que integra uma aplicação web, uma API back-end e um aplicativo mobile, permitindo organizar o fluxo de pedidos entre os garçons e a cozinha.

##  Tecnologias utilizadas

- **Next.js** — Framework React para desenvolvimento da aplicação web.
- **TypeScript** — Tipagem estática para maior segurança e organização do código.
- **Tailwind CSS** — Estilização e criação de interfaces responsivas.
- **Shadcn UI** — Componentes de interface reutilizáveis.
- **API REST** — Comunicação com o back-end para operações do sistema.

##  Funcionalidades

- Visualização e gerenciamento de pedidos.
- Interface para acompanhamento do fluxo de pedidos da pizzaria.
- Gerenciamento de produtos e categorias para usuários administradores.
- Integração com a API back-end.
- Interface organizada e intuitiva.

> As funcionalidades descritas devem corresponder às telas e aos recursos efetivamente implementados neste front-end.

##  Pré-requisitos

Antes de executar o projeto, você precisará ter instalado:

- [Node.js](https://nodejs.org/)
- npm ou outro gerenciador de pacotes compatível.
- A API back-end da Pizzaria Cardoso em execução.

##  Como executar o projeto

**1. Clone o repositório**

```bash
git clone URL_DO_SEU_REPOSITORIO
```

**2. Acesse a pasta do projeto**

```bash
cd NOME_DA_PASTA
```

**3. Instale as dependências**

```bash
npm install
```

**4. Configure as variáveis de ambiente**

Crie um arquivo `.env.local` na raiz do projeto e configure a URL da API:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

Ajuste a URL conforme a configuração do seu back-end. Não compartilhe tokens, senhas ou outras credenciais no repositório.

**5. Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

**6. Acesse a aplicação**

Abra o navegador em:

http://localhost:3000

##  Estrutura do projeto

A organização pode variar conforme a implementação, mas uma estrutura possível é:

```text
src/
├── app/          # Páginas e rotas da aplicação
├── components/   # Componentes reutilizáveis
├── services/     # Comunicação com a API
├── contexts/     # Contextos compartilhados, se utilizados
└── utils/        # Funções auxiliares, se utilizadas

public/           # Arquivos estáticos
.env.local        # Variáveis de ambiente locais
README.md         # Documentação do projeto
```

##  Integração com o back-end

O front-end se comunica com uma API REST desenvolvida em Node.js, responsável pelo processamento das requisições e pela comunicação com o banco de dados.

Essa separação permite organizar as responsabilidades entre a interface web e as regras de negócio do sistema.

##  Objetivo do projeto

Desenvolver uma solução para o ambiente de uma pizzaria, aplicando conhecimentos de desenvolvimento front-end, integração com APIs, componentização, tipagem com TypeScript e organização de código.

O projeto também faz parte do meu aprendizado prático em desenvolvimento Full Stack, com foco na construção de aplicações que atendam a necessidades reais.

##  Desenvolvedor

**Hiago Vinicius dos Santos Antônio**

- LinkedIn: [Meu perfil profissional](https://www.linkedin.com/in/hiago-vinicius-desenvolvedor/)

---

Desenvolvido com dedicação para o projeto Pizzaria Cardoso. 🍕