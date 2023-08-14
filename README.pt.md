# Ibitter: Uma Rede Social Estilo Twitter para Estudantes Universitários

Bem-vindo ao repositório do Ibitter no GitHub! Ibitter é um aplicativo móvel de mídia social de última geração projetado especialmente para estudantes universitários. Nosso objetivo é proporcionar uma plataforma para que os estudantes se conectem, compartilhem suas emoções e troquem experiências no ambiente universitário. Seja para comemorar uma conquista recente ou para expressar seus pensamentos, o Ibitter está aqui para enriquecer sua jornada universitária.

## 🎓 Um Projeto Universitário

O Ibitter é o resultado do nosso trabalho árduo para o curso de **Tópicos de Programação em Novas Tecnologias**. Como uma equipe de estudantes dedicados, aplicamos nosso conhecimento e criatividade para desenvolver um aplicativo que atenda às necessidades da vida universitária moderna.

## 📖 Visão Geral do Projeto

O projeto Ibitter é composto por uma interface de usuário dinâmica (front-end), uma API robusta e uma lógica sólida nos bastidores (back-end), todos trabalhando juntos para criar uma experiência de usuário perfeita.

### Front-end (Aplicativo Móvel)

Nosso front-end é construído com tecnologias modernas para garantir uma interface de usuário suave e envolvente:

- **JavaScript (ES6+)**: A base do nosso desenvolvimento front-end.
- **React-Native**: Nos permite criar uma experiência de aplicativo móvel semelhante a nativa.
- **Expo**: Uma ferramenta que acelera nosso desenvolvimento com React Native.

### Back-end (Lógica de Negócios)

O back-end do Ibitter é onde a mágica acontece. Ele fornece os serviços e a lógica necessários para garantir o funcionamento impecável do aplicativo:

- **NodeJS**: A base das nossas operações no servidor.
- **Express**: Um framework de aplicativo web rápido e minimalista para Node.js.
- **PostgreSQL**: Nosso banco de dados relacional escolhido, garantindo integridade e eficiência nos dados.

## ⬇️ Guia de Instalação

Colocar o Ibitter em funcionamento é simples. Siga estas etapas para instalar os componentes necessários no seu sistema:

🔔 **Observação**: As etapas de instalação podem variar de acordo com o seu sistema operacional. Fornecemos orientações gerais, mas adapte-as ao seu ambiente, se necessário.

1. **NodeJS, NPM e Expo**: Verifique se você tem o NodeJS, o NPM e o Expo instalados no seu sistema.

2. **PostgreSQL**: Instale o PostgreSQL na sua máquina. Se precisar de ajuda, consulte a documentação do PostgreSQL.

3. **Configuração do Banco de Dados**: Faça login no PostgreSQL pelo seu terminal:

   ```sh
   psql
   ```

   Crie um usuário chamado `ibitter_user`:

   ```sql
   CREATE USER ibitter_user WITH PASSWORD '<sua senha>' CREATEDB;
   ```

   Crie um banco de dados chamado `ibitter_db`:

   ```sql
   CREATE DATABASE ibitter_db;
   ```

   Transfira a propriedade do `ibitter_db` para o usuário `ibitter_user`:

   ```sql
   ALTER DATABASE ibitter_db OWNER TO ibitter_user;
   \q
   ```

4. **Clonar o Repositório**: Clone este repositório para a sua máquina local:

   ```sh
   git clone https://github.com/ricardofares/ibitter.git
   ```

5. **Dependências do Front-end**: Navegue até o diretório do projeto e instale as dependências do front-end:

   ```sh
   cd ibitter/frontend
   npm install
   cd ..
   ```

6. **Dependências do Back-end**: Instale as dependências do back-end:

   ```sh
   cd backend
   npm install
   ```

7. **Configuração do Banco de Dados**: No arquivo `knexfile.js`, atualize a senha para corresponder à que você definiu para o usuário `ibitter_user`.

## 🏃 Executando o Ibitter

Para aproveitar ao máximo o Ibitter, certifique-se de que tanto o front-end quanto o back-end estão em execução:

1. **Front-end**: Inicie o front-end executando os seguintes comandos:

   ```sh
   cd frontend
   npx expo start
   ```

2. **Back-end**: Abra outra janela do terminal, navegue até o diretório `ibitter` e inicie o back-end:

   ```sh
   cd backend
   npm run start
   ```

Parabéns! O Ibitter agora está funcionando e você está pronto para mergulhar no mundo das mídias sociais universitárias.

Sinta-se à vontade para explorar, compartilhar suas emoções e se conectar com outros estudantes. Se você encontrar algum problema ou tiver sugestões para melhorias, não hesite em entrar em contato. Divirta-se no Ibitter! 🎉
