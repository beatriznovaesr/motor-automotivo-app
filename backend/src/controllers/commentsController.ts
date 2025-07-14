import { Request, Response } from "express";
import { CommentsService } from "../services/commentsService";

const commentsVM = new CommentsService();

export class CommentsController {

  async buscarComentarios(req: Request, res: Response) {
    try {
      console.log("CONTROLLER: buscarComentarios", req.params.motorId)

        const userId = req.query.userId as string;
        const motorId = req.params.motorId;

        const comments = await commentsVM.buscarComentarios(motorId, userId);
        res.status(200).json(comments || []);
        } catch (error: any) {
        res.status(500).json({ erro: error.message });
        }
    }

  async criarNotificacoes(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const replies = await commentsVM.buscarRespostasParaUsuario(userId);

      const notificacoes = replies.map((reply) => ({
        _id: reply._id,
        message: `Usuário ${reply.userId as any} respondeu seu comentário em ${reply.motorId as any}`,
        createdAt: reply.createdAt,
        read: false,
      }));

      res.status(200).json(notificacoes);

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
    const { userId, text } = req.body;

    const reply = await commentsVM.replyToComment(parentId, userId, text);
    if (!reply) {
      return res.status(404).json({ error: "Comentário original não encontrado" });
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
}
