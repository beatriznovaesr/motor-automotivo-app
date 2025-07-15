import mongoose from "mongoose";
import CommentModel, { Comment } from "../models/Comments";

export class CommentsService {
  async addComment(userName: string, userId: string, motorId: string, text: string): Promise<Comment> {
    try {
      console.log("CHEGANDO NO COMMENT SERVICE",userName, userId, motorId, text)
      const newComment = new CommentModel({
        userName,
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

  async replyToComment(parentId: string, userName: string, userId: number, text: string): Promise<Comment | null> {
    try {
      const parent = await CommentModel.findById(parentId);
      if (!parent) return null;

      const reply = new CommentModel({
        userName,
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

  async deletarComentario(commentId: string): Promise<Comment | null> {
    try {
      const deleted = await CommentModel.findByIdAndDelete(commentId);

      return deleted;

    } catch (error) {
      console.error("Erro ao deletar comentário:", error);
      throw new Error("Erro ao deletar comentário");
    }
  }

    async buscarComentarios(motorId: string, userId: string): Promise<any[]> {
      //console.log("Services: buscarComentarios", motorId)

      const comentarios = await CommentModel.find({ motorId }).exec();

      if (!comentarios) throw new Error("Motor não encontrado");

      const comentariosComPermissao = comentarios.map((comentario) => {
        const obj = comentario.toObject();
        return {
          ...obj,
          podeEditar: obj.userId.toString() === userId
        };
      });
      //console.log(comentariosComPermissao)
      return comentariosComPermissao;
    }

    async buscarRespostasParaUsuario(userId: string) {
      const comentariosDoUsuario = await CommentModel.find({ userId });
      const idsDosComentariosDoUsuario = comentariosDoUsuario.map(c => c._id.toString());
      const  respostas  = await CommentModel.find({
      replyTo: { $in: idsDosComentariosDoUsuario },
    })
    .populate("userId") // para mostrar nome de quem respondeu, se quiser
    .populate("motorId"); // opcional
    console.log("log aqui mesmo", respostas);
   return respostas.filter((r) => r.replyTo !== null);
    }

    async getCommentById(commentId: string) {
      return CommentModel.findById(commentId);
}

}
