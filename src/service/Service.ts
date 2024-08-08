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

  public async terceiraQuestãoService() {
    const tecnologias = ["reactjs", "javascript", "php"];
    const concorrentes = [
      "vue.js",
      "angular",
      "java",
      "typescript",
      "python",
      "go",
    ];

    const getTechs = await this.getDataWithAverageByYear(tecnologias);
    const getConco = await this.getDataWithAverageByYear(concorrentes);

    return {
      getTechs,
      getConco,
    };
  }

  public async quartaQuestãoService() {
    const frontEnd = ["reactjs", "vue.js", "angular", "sass", "css"];
    const backEnd = ["php", "node.js", "laravel", "express", "java"];

    const dataFront = await this.getDataWithAverageByYear(frontEnd);
    const dataBack = await this.getDataWithAverageByYear(backEnd);

    return {
      dataFront,
      dataBack,
    };
  }

  public async getDataWithAverageByYear(array: string[]) {
    try {
      const result = await termosTiDocument
        .aggregate([
          {
            $match: {
              Termo: { $in: array },
              Mensuracao: {
                $gte: "01/1/2015",
                $lt: "01/1/2024",
              },
            },
          },
          {
            $group: {
              _id: {
                tecnologia: "$Termo",
                ano: "$Mensuracao",
              },
              participacao: { $avg: "$Participacao" },
            },
          },
          {
            $sort: { _id: 1 },
          },
        ])
        .toArray();
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}

export const service = new Service();
