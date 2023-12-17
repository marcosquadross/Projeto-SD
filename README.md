# Message Delivery

Este projeto tem como objetivo implementar um sistema de envio de mensagens entre múltiplos usuários.

## Cliente

- cadastro na plataforma.
- enviar e receber mensagens.
- editar seu cadastro.
- criar grupos de pessoas para envio de mensagens.
- 2-way authentication
- receber notificações de novas mensagens.

## Componentes e Funcionalidades:

Usuário:
    - Autentica-se no sistema através da interface de usuário.
    - Submete uma solicitação para enviar um e-mail, fornecendo os destinatários, o conteúdo e outras informações necessárias.
    - Criar grupos de pessoas para envio de mensagens.

Servidor:
    - Valida as credenciais do usuário.
    - Processa as solicitações do usuário.

Banco de Dados:
    - Armazena informações relevantes, como dados do usuário, configurações de e-mail e histórico de envio de e-mails.
    - Escalável e tolerante a falhas.

WebSocket:
    - Fornece uma comunicação em tempo real para notificar o usuário sobre o status do envio de e-mail, confirmações ou eventuais erros.


## Tecnologias Utilizadas:

- React
- Node.js
- Express
- MongoDB
- WebSocket


## Fluxo de Envio de E-mails:

1. O usuário se autentica no sistema.
2. O usuário submete uma solicitação para enviar um e-mail.
3. O servidor recebe a solicitação de envio de e-mail do usuário.
4. O servidor utiliza o sistema de e-mail interno para compor e enviar o e-mail para os destinatários.
5. Durante o processo de envio, o servidor atualiza o status no banco de dados.
6. O WebSocket atualiza em tempo real os emails enviados.

## Alunos

<table style="display: flex; align-items: center;  flex-direction: row; gap: 10px;" ><tr>

<td><a href="https://github.com/marcosquadross/">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/98984018?v=4" width="100px;" alt=""/>
<br />
 <b>Marcos Quadros
</b>
 </a> <a href="https://github.com/marcosquadross/" title="Repositório Marcos Quadros"></a>

RA: 2380560</td>


<td><a href="https://github.com/thiagogquinto">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/95106865?v=4" width="100px;" alt=""/>
<br />
 <b>Thiago Gariani
</b>
 </a> <a href="https://github.com/thiagogquinto" title="Repositório Thiago Gariani"></a>

RA: 2388898</td>

</tr></table>