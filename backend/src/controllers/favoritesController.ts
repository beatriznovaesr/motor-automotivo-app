import { Request, Response } from "express";
import { FavoriteService } from "../services/FavoritesService";

const favoritesVM = new FavoriteService();

export class FavoritesController {

  async findFavorites(req: Request, res: Response) {
      try {
          console.log("CONTROLLER: findFavorites", req.params.userId)

          const favorites = await favoritesVM.findFavorites(req.params.userId);
          res.status(200).json(favorites);

          } catch (error: any) {
            console.error("Erro no controller de favoritos:", error);
            res.status(500).json({ erro: error.message });
          }
      }

  async addFavorite(req: Request, res: Response) {
    try {
      console.log("CONTROLLER: addFav", req.body)
      const { userId, motorId } = req.body;

      if ( !userId || !motorId) {
        res.status(400).json({ error: "Dados inválidos" });
        return;
      }

      const comment = await favoritesVM.addFavorite(userId, motorId);
      res.status(201).json(comment);

    } catch (error: any) {
      console.error("Erro ao adicionar favorito:", error);
      res.status(500).json({ error: error.message });
    }
  }
}
