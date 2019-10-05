# Webhook Hotmart Google Spreadsheets
Webhook para sincronizar os eventos do Hotmart com o google spreadsheets

# Como usar?

## Planilha modelo

Faça uma cópia desse modelo para você

https://docs.google.com/spreadsheets/d/1FNCywA8HgDhmhNAlpXIz30EQ4SV41dJML2dQfMLHZCk/edit?usp=sharing

## Publicando seu aplicativo web

* Abra o editor em: `Ferramentas >> Editor de Scripts`
* Crie um novo script `Arquivo >> Novo >> Arquivo de script`
* Copie o arquivo `script.js` e cole nesse novo arquivo
* Publique em: `Publicar >> Implantar como aplicativo da web`
* Defina uma `Nova` versão para o aplicativo
* No campo `Executar este aplicativo como`, escolha seu usuário
* No campo `Quem tem acesso ao aplicativo`, escolha `Qualquer pessoa, mesmo anônima`
* Você precisará autorizar o applicativo a usar sua conta.
* Copia a nova `Url` gerada.

## Incluindo seu aplicativo no Hotmart

* Logue com seu usuário em https://app-vlc.hotmart.com/login
* Vá em `Ferramentas >> Webhook (API e Notificações)
* Adicione uma `Nova configuração com a Url do seu aplicativo`
* Você pode disparar um evento de teste para se certificar se está tudo certo.

# IMPORTANTE !!

* Não altere a ordem das colunas
* Não altere os nomes das colunas
* Não altere os nomes das abas

# DICA :)

Use essa planilha apenas como base de dados e crie uma outra para você trabalhar os dados.
