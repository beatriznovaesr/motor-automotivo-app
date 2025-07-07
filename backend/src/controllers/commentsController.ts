import { Request, Response } from "express";
import { CommentsService } from "../services/commentsService";
import { NotificationService } from "../services/notificationsService";

const commentsVM = new CommentsService();
const notificationsVM = new NotificationService();

export class CommentsController {
  async addComment(req: Request, res: Response) {
    try {
      const { userId, motorId, text } = req.body;

      if (!text || !userId || !motorId) {
        return res.status(400).json({ error: "Dados inválidos" });
      }

      const comment = await commentsVM.addComment(userId, motorId, text);
      return res.status(201).json(comment);

    } catch (error: any) {
      console.error("Erro ao adicionar comentário:", error);
      return res.status(500).json({ error: error.message });
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
