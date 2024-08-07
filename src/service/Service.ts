import { termosTiDocument } from "../database/Database";

class Service {
  public async primeiraQuestãoService() {
    const tecnologias = ["javascript", "c", "java", "php", "css"];

    try {
      const data = await termosTiDocument
        .aggregate([
          {
            $match: { Termo: { $in: tecnologias } },
          },
          {
            $sort: { Termo: 1, Mensuracao: 1 },
          },
        ])
        .sort({ Termo: 1 })
        .toArray();

      return data;
    } catch (err) {
      throw new Error();
    }
  }

  public async segundaQuestãoService() {
    const tecnologias = ["reactjs", "javascript"];

    try {
      const data = await termosTiDocument
        .aggregate([
          {
            $match: { Termo: { $in: tecnologias } },
          },
          {
            $sort: { Termo: 1, Mensuracao: 1 },
          },
        ])
        .toArray();

      const isOnlyFirstMonth = /^(\d{2})\/1\/\d{4}$/;

      const filteredData = data.filter((item) =>
        isOnlyFirstMonth.test(item.Mensuracao)
      );
      return filteredData;
    } catch (err) {
      throw new Error();
    }
  }

  public async terceiraQuestãoService() {}
}

export const service = new Service();
