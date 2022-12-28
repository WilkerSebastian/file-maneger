import { Request, Response } from "express";
import Arquivo from "../model/Arquivo";
import fs from "fs"
import { resolve } from "path";

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

    public async getFile(req:Request , res:Response) {

        let caminho = resolve("./src/app/tmp/")

        const {id} = req.params

        const dir = fs.readdirSync(caminho).filter((e) => e.slice(0 , arquivo.identificador.length) == arquivo.identificador && e.slice(arquivo.identificador.length) == id)

        const arquivo = await new Arquivo().getFile(Number(id))

        if (dir.length == 0) {
            
            caminho += `\\${arquivo.identificador + id}.png`

            fs.writeFileSync(caminho , arquivo.file)

        } else {

            caminho += ("\\" + dir[0])
            
        }

        setTimeout(() => {

            fs.unlinkSync(caminho)

        }, 10000)

        return res.download(caminho)

    }

    public async listarPorIdentifcador(req:Request , res:Response) {

        const identificador = String(req.query.identificador)

        const arquivo = new Arquivo()

        const arquivos = await arquivo.list(identificador)

        return res.render("listar", {arquivos})

    }

    public async deletar(req:Request , res:Response) {

        const {id} = req.params

        const arquivo = new Arquivo()

        const identificador = await arquivo.remove(Number(id))

        res.redirect(`/buscar?identificador=${identificador}`)

    }

}

export default new IndexController()