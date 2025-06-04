# Desafio-Pokemon

---

## Execução do código 

para executar o código siga os comandos a seguir

### **1. Ligar o Server BackEnd**
abra um primeiro terminal no VScode e execute os comandos

- **1º:** `entrar na pasta que contem os dados do backend`
 ```json
  {
    "cd desafio/back"
  }
  ```
- **2º:** `executar o comando para instalar todas as dependências necessárias`
 ```json
  {
    "npm install"
  }
  ```
- **3º:** `executar o comando para iniciar o servidor`
 ```json
  {
    "npm start"
  }
  ```

  ### **1. Executar o FrontEnd**
abra um segundo terminal no VScode e execute os comandos

- **1º:** `entrar na pasta que contem os dados do backend`
 ```json
  {
    "cd desafio/front"
  }
  ```
- **2º:** `executar o comando para instalar todas as dependências necessárias`
 ```json
  {
    "npm install"
  }
  ```
- **3º:** `executar o comando para iniciar o front pelo vite`
 ```json
  {
    "npm run dev"
  }
  ```

  ### **3. Abrir a Aplicação**

Use a tecla Ctrl + clique direito no link http://localhost:3000 que sera gerado no segundo terminal que está aberto o server Vite do frontend para abrir a aplicação e testa-la


---

# Testes de Integração

---

## Execução dos testes

para executar o código siga os comandos a seguir

### **1. Execução**
abra um terceiro terminal no VScode e execute os comandos

- **1º:** `entrar na pasta que contem os dados do front`
 ```json
  {
    "cd desafio/front"
  }
  ```
- **2º:** `executar o comando para abrir o cypress`
 ```json
  {
    "npx cypress open"
  }
  ```
- **3º:** `executar os testes em e2e`
 Abra o Cypress escolha a opção e2e para testes clique em continuar, 
 apos isso selecione o navegador que deseja fazer os testes,
 vá na aba de specs e execute cada um dos scripts de teste.
