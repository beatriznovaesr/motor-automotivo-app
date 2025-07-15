import { Request, Response } from "express";
import { CommentsService } from "../services/commentsService";
import * as NotificationService from "../services/notificationService";
import MotorModel, { Motor } from '../models/Motor';

const commentsVM = new CommentsService();

export class CommentsController {

  async buscarComentarios(req: Request, res: Response) {
    try {
      //console.log("CONTROLLER: buscarComentarios", req.params.motorId)

        const userId = req.query.userId as string;
        const motorId = req.params.motorId;

        const comments = await commentsVM.buscarComentarios(motorId, userId);
        res.status(200).json(comments || []);
        } catch (error: any) {
        res.status(500).json({ erro: error.message });
        }
    }

  async criarNotificacoes(req: Request, res: Response) {
    console.log("coisaaaa")
    try {
      const userId = req.params.userId;
      console.log("user no controller", userId);
      console.log("criar not no controller", userId);
      const resposta = await NotificationService.getNotificationsByUser(userId);
      const mensagens = resposta.map(n => n.message);

      console.log(mensagens);
      res.status(200).json(mensagens);

    } catch (error: any) {
      console.error("Erro ao buscar notificações:", error);
      res.status(500).json({ erro: error.message });
    }
  }

  async addComment(req: Request, res: Response) {
    try {
      console.log("CONTROLLER: addComment", req.body)
      const { userName, userId, motorId, text } = req.body;

      if (!userName || !text || !userId || !motorId) {
        res.status(400).json({ error: "Dados inválidos" });
        return;
      }

      const comment = await commentsVM.addComment(userName, userId, motorId, text);
      res.status(201).json(comment);

    } catch (error: any) {
      console.error("Erro ao adicionar comentário:", error);
      res.status(500).json({ error: error.message });
    }
  }

 async replyToComment(req: Request, res: Response) {
   try {
    const parentId = req.params.id;
    const { userName, userId, text } = req.body;

    const reply = await commentsVM.replyToComment(parentId, userName, userId, text);
    if (!reply) {
      return res.status(404).json({ error: "Comentário original não encontrado" });
    }

    const originalComment = await commentsVM.getCommentById(parentId);
    
    if (
      originalComment &&
      originalComment.userId.toString() !== userId 
    ) {

      const motor = await MotorModel.findById(originalComment.motorId);
      const modelo = motor?.modelo || 'motor desconhecido';
      console.log("modelo", modelo, "id", originalComment.motorId)
      const notificationMessage = `Usuário ${userName} respondeu seu comentário sobre o motor ${modelo}`;
      console.log("Mensagem da notificação:", notificationMessage);
      await NotificationService.createNotification(originalComment.userId.toString(), notificationMessage);
    }
    return res.status(201).json(reply);

  } catch (error: any) {
    console.error("Erro ao responder comentário:", error);
    return res.status(500).json({ error: error.message });
  }
}

  async editComment(req: Request, res: Response) {
    try {
      const commentId = req.params.id;
      const { text } = req.body;

      const updated = await commentsVM.editComment(commentId, text);
      if (!updated) {
        return res.status(404).json({ error: "Comentário não encontrado" });
      }

      return res.status(200).json(updated);

    } catch (error: any) {
      console.error("Erro ao editar comentário:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  async deletarComentario(req: Request, res: Response) {
    try {
      const commentId = req.params.id;

      const deleted = await commentsVM.deletarComentario(commentId);

      if (!deleted) {
        return res.status(404).json({ error: "Comentário não encontrado" });
      }
      return res.status(200).json(deleted);

    } catch (error: any) {
      console.error("Erro ao deletar comentário:", error);
      return res.status(500).json({ error: error.message });
    }
  }
}
