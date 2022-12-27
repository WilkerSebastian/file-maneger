import db from "../database/conexao"
import fs from "fs"
import { resolve } from "path"

export default class Arquivo {

    async create(identificador: string) {

        const nomeFile = fs.readdirSync(resolve(`./src/app/uploads/`)).filter((e) => e.slice(0, e.indexOf(".")) == identificador)

        const file = fs.readFileSync(resolve(`./src/app/uploads/${nomeFile}`))

        await db.query(`INSERT INTO arquivo (identificador, file, data) VALUES ($1, $2, $3);`, [

            identificador,
            file.values(),
            new Date().toLocaleDateString()

        ])
            .then(() => {

                console.log("arquivo salvo com sucesso");

            })
            .catch((err: Error) => {

                console.log(err.message);

            })

        fs.unlinkSync(resolve(`./src/app/uploads/${nomeFile}`))

    }

    async list(identificador?: string) {

        let arquivos: any[]

        if (identificador) {

            arquivos = (await db.query("SELECT id, identificador, file, to_char(data, 'dd/MM/yyyy') FROM arquivo WHERE identificador = $1 ORDER BY id ASC;",[identificador])).rows

        } else {

            arquivos = (await db.query("SELECT id, identificador, file, to_char(data, 'dd/MM/yyyy') FROM arquivo ORDER BY id ASC;")).rows

        }

        return arquivos

    }

    async init() {

        await db.query(`
            CREATE TABLE IF NOT EXISTS arquivo (

                id integer NOT NULL PRIMARY KEY,
                identificador character varying(100) NOT NULL,
                file bytea[] NOT NULL,
                data date NOT NULL,

            )
        `)
            .then(() => {

                console.log("tabela criada com sucesso");

            })
            .catch((err) => {

                console.log(`Erro ao criar a tabela!\n ${err}`);

            })


    }

}