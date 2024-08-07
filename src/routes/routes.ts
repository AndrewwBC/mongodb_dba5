import { Request, Response, Router } from "express";
import { controller } from "../controller/Controller";

const router = Router();

router.get("/", (request: Request, response: Response) => {
  return response.status(200).json({ message: "Sucesso" });
});

router.get("/primeira_questao", controller.primeiraQuestão);
router.get("/segunda_questao", controller.segundaQuestão);
router.get("/terceira_questao", controller.terceiraQuestão);

export { router };
