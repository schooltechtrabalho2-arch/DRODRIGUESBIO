# D.RODRIGUESBIO

Portal educativo sobre animais e biodiversidade — Daniel Rodrigues, biólogo.

## Como rodar no seu computador

Pré-requisito: ter o **Node.js** instalado (versão 18 ou mais recente).
Baixe em: https://nodejs.org

1. Extraia esta pasta em qualquer lugar do seu computador.
2. Abra o terminal (Prompt de Comando, PowerShell ou Terminal) dentro da pasta `drodriguesbio-site`.
3. Instale as dependências:

   ```
   npm install
   ```

4. Rode o site em modo de desenvolvimento:

   ```
   npm run dev
   ```

5. O terminal vai mostrar um endereço, algo como `http://localhost:5173`.
   Abra esse endereço no navegador — o site estará funcionando, com menu, busca,
   fichas dos animais, quiz, comparador e todas as páginas navegáveis.

## Como gerar uma versão para publicar (hospedar) o site

Quando quiser publicar o site na internet (Vercel, Netlify, etc.):

```
npm run build
```

Isso gera uma pasta `dist/` com o site pronto para produção, que pode ser
enviada para qualquer serviço de hospedagem de sites estáticos.

## Estrutura do projeto

```
drodriguesbio-site/
├── index.html          # página HTML principal
├── src/
│   ├── main.jsx         # ponto de entrada do React
│   ├── App.jsx          # todo o site (páginas, dados dos animais, componentes)
│   └── index.css        # estilos base (Tailwind)
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Próximos passos sugeridos

- Substituir os dados estáticos de animais em `src/App.jsx` (array `ANIMALS`)
  por uma fonte de dados real (banco de dados/CMS) para crescer o catálogo.
- Adicionar mais fotos e referências científicas em cada ficha.
- Conectar um domínio próprio após publicar (ex: Vercel ou Netlify, ambos com
  plano gratuito para esse tipo de projeto).
