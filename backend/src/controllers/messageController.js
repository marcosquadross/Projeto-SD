import { Message as MessageModel } from "../models/Message.js";
import { User as UserModel } from "../models/User.js";
import { Group } from "../models/Group.js";
import { ObjectId } from "mongodb";

import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Cliente " + ws + " conectado");

  // Evento para lidar com mensagens recebidas do cliente
  ws.on("message", (message) => {
    console.log(`Recebido do cliente: ${message}`);

    // Enviar a mensagem de volta para o cliente
    ws.send(`Recebido: ${message}`);
  });

  // Evento para lidar com a conexão fechada pelo cliente
  ws.on("close", () => {
    console.log("Cliente desconectado");
  });
});

function sendEmail(message) {
  console.log("Enviando email para WS...");
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

async function getUserIdByName(name) {
  const user = await UserModel.findOne({ username: name });

  if (user) {
    return user._id;
  } else {
    throw new Error(`Usuário user ${name} não encontrado.`);
  }
}

async function getUsersIdByName(names) {
  var users = [];
  for (const name of names) {
    users.push(await getUserIdByName(name));
  }
  return users;
}

async function getUserNameById(id) {
  const user = await UserModel.findById(id);
  return user.username;
}

async function getRecipientsNamesByIds(ids) {
  var dests = [];
  for (const id of ids) {
    dests.push(await getUserNameById(new ObjectId(id)));
  }
  return dests;
}

const messageController = {
  create: async (req, res) => {
    try {
      const dest = await getUsersIdByName(req.body.recipients);
      const author = new ObjectId(req.body.author);

      const message = {
        title: req.body.title,
        author: author,
        content: req.body.content,
        time: req.body.time,
        recipients: dest,
        files: req.body.files,
      };

      const response = await MessageModel.create(message);

      const ws_message = {
        _id: response._id,
        _v: response._v,
        author: await getUserNameById(req.body.author),
        content: req.body.content,
        createdAt: response.createdAt,
        files: req.body.files,
        recipients: req.body.recipients,
        time: req.body.time,
        title: req.body.title,
        updatedAt: response.updatedAt,
        };

      sendEmail(ws_message);
      return;
      res.status(201).json({ response, msg: "Mensagem criada com sucesso!" });
    } catch (error) {
      console.log(`ERRO: ${error}`);
      console.log(error);
      res.status(500).json({ msg: "Ocorreu um erro ao criar mensagem." });
    }
  },

  getById: async (req, res) => {
    try {
      const message = await MessageModel.findById(req.params.id);

      if (!message) {
        res.status(404).json({ msg: "Mensagem não encontrado." });
        return;
      }

      res.json(message);
    } catch (error) {
      console.log(`ERRO: ${error}`);
      res.status(500).json({ msg: "Ocorreu um erro ao buscar mensagem." });
    }
  },

  getByAuthor: async (req, res) => {
    try {
      const author_id = new ObjectId(req.params.id);

      const messages = await MessageModel.find({ author: author_id });

      const updatedMessages = [];
      let new_message = {};

      if (!messages) {
        res.status(404).json({ msg: "Nenhuma mensagem encontrada" });
        return;
      }

      for (const message of messages) {
        const id = new ObjectId(message.author);
        new_message = message.toObject();
        new_message.author = await getUserNameById(id);
        new_message.recipients = await getRecipientsNamesByIds(
          message.recipients
        );
        updatedMessages.push(new_message);
      }

      res.json(updatedMessages);
    } catch (error) {
      console.log(`ERRO: ${error}`);
      res.status(500).json({ msg: "Ocorreu um erro ao buscar as mensagens" });
    }
  },

  getByRecipient: async (req, res) => {
    try {
      const messages = await MessageModel.find({ recipients: req.params.id });

      const updatedMessages = [];
      let new_message = {};

      if (!messages || messages.length === 0) {
        res.status(404).json({ msg: "Nenhuma mensagem encontrada" });
        return;
      }

      for (const message of messages) {
        const id = new ObjectId(message.author);
        new_message = message.toObject();
        new_message.author = await getUserNameById(id);
        new_message.recipients = await getRecipientsNamesByIds(
          message.recipients
        );
        updatedMessages.push(new_message);
      }

      res.json(updatedMessages);
    } catch (error) {
      console.log(`ERRO: ${error}`);
      res.status(500).json({ msg: "Ocorreu um erro ao buscar as mensagens" });
    }
  },

  delete: async (req, res) => {
    try {
      const message = await MessageModel.findByIdAndDelete(req.params.id);

      if (!message) {
        res.status(404).json({ msg: "Mensagem não encontrada." });
        return;
      }

      res.status(200).json({ message, msg: "Mensagem deletada com sucesso!" });
    } catch (error) {
      console.log(`ERRO: ${error}`);
      res.status(500).json({ msg: "Ocorreu um erro ao deletar mensagem." });
    }
  },

  createGroupMessage: async (req, res) => {
    try {
      const group = await Group.findById(req.body.id);
      if (!group) {
        res.status(404).json({ msg: "Grupo não encontrado." });
        return;
      }

      console.log(req.body);

      const dests = group.members
        .filter((memberId) => memberId.toString() !== req.body.author)
        .map((memberId) => new ObjectId(memberId));

      const author = new ObjectId(req.body.author);

      const message = {
        title: req.body.title,
        author: author,
        content: req.body.content,
        time: req.body.time,
        recipients: dests,
        files: req.body.files,
      };

      const response = await MessageModel.create(message);

      const ws_message = {
        _id: response._id,
        _v: response._v,
        author: await getUserNameById(req.body.author),
        content: req.body.content,
        createdAt: response.createdAt,
        files: req.body.files,
        recipients: req.body.recipients,
        time: req.body.time,
        title: req.body.title,
        updatedAt: response.updatedAt,
      }

      sendEmail(ws_message);
      
      res.status(201).json({ response, msg: "Mensagem criada com sucesso!" });
    } catch (error) {
      console.log(`ERRO: ${error}`);
      console.log(error);
      res.status(500).json({ msg: "Ocorreu um erro ao criar mensagem." });
    }
  },
};

export { messageController, wss };
