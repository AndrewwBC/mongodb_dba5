import { Request, Response } from "express";
import { service } from "../service/Service";

class Controller {
  public async primeiraQuestão(request: Request, response: Response) {
    try {
      const result = await service.primeiraQuestãoService();
      return response.status(200).json({ data: result });
    } catch (err) {
      console.log(err);
      return response.status(400).json({ error: "Erro na primeira questão" });
    }
  }

  public async segundaQuestão(request: Request, response: Response) {
    try {
      const result = await service.segundaQuestãoService();
      return response.status(200).json({ data: result });
    } catch (err) {
      console.log(err);
      return response.status(400).json({ error: "Erro na segunda questão" });
    }
  }

  public async terceiraQuestão(request: Request, response: Response) {}
}

export const controller = new Controller();
