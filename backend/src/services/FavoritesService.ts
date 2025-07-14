import mongoose from "mongoose";
import FavoriteModel, { Favorite } from "../models/Favorites";
import Motor from "../models/Motor";

export class FavoriteService {
    async addFavorite(userId: string, motorId: string){
        try {
              console.log("CHEGANDO NO FAV SERVICE", userId, motorId)
              const newFavorite = new FavoriteModel({
                userId,
                motorId,
              });
        
              await newFavorite.save();
              return newFavorite;
            } catch (error) {
              console.error("Erro ao adicionar favorito:", error);
              throw new Error("Erro ao adicionar favorito");
            }
    }

    async findFavorites(userId: string): Promise<Favorite[]> {
        console.log("FAV SERVICES: findFavorites", userId)
          try{
              const favorites = await FavoriteModel.find({ userId: userId }).exec();
              //const favorites = [{motorId: "djso", userId: "nddnsk"}]
              console.log(favorites)
             
              return favorites;

          } catch (error) {
            console.error('Erro ao buscar favoritos', error);
           throw new Error("Favoritos não encontrados");
           }
         }

    /*async findFavorites(userId: string): Promise<Favorite[]> {
          console.log("Services: buscarfav", userId)
    
          //const favorites = await FavoriteModel.find({ userId }).exec();
          const favorites = [{userId: "jn", motorId: "nxskj"}];
          if (!favorites) throw new Error("fav não encontrado");
          console.log(favorites)
          return favorites;
        }*/

}