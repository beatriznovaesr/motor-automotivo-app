import mongoose from "mongoose";
import CommentModel, { Comment } from "../models/Comments";

export class CommentsService {
  async addComment(userId: string, motorId: string, text: string): Promise<Comment> {
    try {
      console.log("CHEGANDO NO COMMENT SERVICE", userId, motorId, text)
      const newComment = new CommentModel({
        userId,
        motorId,
        text,
        createdAt: new Date(),
      });

      await newComment.save();
      return newComment;
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
      throw new Error("Erro ao adicionar comentário");
    }
  }

  async replyToComment(parentId: string, userId: number, text: string): Promise<Comment | null> {
    try {
      const parent = await CommentModel.findById(parentId);
      if (!parent) return null;

      const reply = new CommentModel({
        userId,
        motorId: parent.motorId,
        text,
        replyTo: parent._id,
        createdAt: new Date(),
      });

      await reply.save();
      return reply;
    } catch (error) {
      console.error("Erro ao responder comentário:", error);
      throw new Error("Erro ao responder comentário");
    }
  }

  async editComment(commentId: string, newText: string): Promise<Comment | null> {
    try {
      const updated = await CommentModel.findByIdAndUpdate(
        commentId,
        { text: newText },
        { new: true }
      );

      return updated;
    } catch (error) {
      console.error("Erro ao editar comentário:", error);
      throw new Error("Erro ao editar comentário");
    }
  }

    async buscarComentarios(motorId: string): Promise<Comment[]> {
      console.log("Services: buscarComentarios", motorId)

      const comentarios = await CommentModel.find({ motorId }).exec();

      if (!comentarios) throw new Error("Motor não encontrado");
      console.log(comentarios)
      return comentarios;
    }
}
