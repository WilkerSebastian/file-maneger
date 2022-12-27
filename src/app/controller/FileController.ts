import { Request, Response } from "express";
import Arquivo from "../model/Arquivo";

class IndexController {

    public async salvar(req:Request, res:Response) {

        const arquivo = new Arquivo()

        await arquivo.create(req.body.identificador)

        return res.redirect("/")

    }

    public async listar(req:Request , res:Response) {

        const arquivo = new Arquivo()

        const arquivos = await arquivo.list()

        return res.render("listar" , {arquivos})

    }

    public async listarPorIdentifcador(req:Request , res:Response) {

        const arquivo = new Arquivo()

        const arquivos = await arquivo.create(req.params.identificador)

        return res.render("listar", {arquivos})

    }

}

export default new IndexController()