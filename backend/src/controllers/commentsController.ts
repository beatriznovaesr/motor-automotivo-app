import { Request, Response } from "express";
import { CommentsService } from "../services/commentsService";
import { NotificationService } from "../services/notificationsService";

const commentsVM = new CommentsService();
const notificationsVM = new NotificationService();

export class CommentsController {

  async buscarComentarios(req: Request, res: Response) {
    try {
      console.log("CONTROLLER: buscarComentarios", req.params.motorId)
        const comments = await commentsVM.buscarComentarios(req.params.motorId);
        res.status(200).json(comments || []);
        } catch (error: any) {
        res.status(500).json({ erro: error.message });
        }
    }

  async addComment(req: Request, res: Response) {
    try {
      console.log("CONTROLLER: addComment", req.body)
      const { userId, motorId, text } = req.body;

      if (!text || !userId || !motorId) {
        res.status(400).json({ error: "Dados inválidos" });
        return;
      }

      const comment = await commentsVM.addComment(userId, motorId, text);
      res.status(201).json(comment);

    } catch (error: any) {
      console.error("Erro ao adicionar comentário:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async replyToComment(req: Request, res: Response) {
    try {
      const parentId = req.params.id;
      const { userId, text } = req.body;

      const reply = await commentsVM.replyToComment(parentId, userId, text);
      if (!reply) {
        return res.status(404).json({ error: "Comentário original não encontrado" });
      }

      await notificationsVM.createNotification(
        userId,
        `Usuário ${userId} respondeu seu comentário em Motor exemplo ${reply.motorId}`
      );

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
}
