import db from "../database/conexao"
import fs from "fs"
import { resolve } from "path"

export default class Arquivo {

    async create(identificador: string) {

        const nomeFile = fs.readdirSync(resolve(`./src/app/uploads/`)).filter((e) => e.slice(0, e.indexOf(".")) == identificador)

        const file = fs.readFileSync(resolve(`./src/app/uploads/${nomeFile}`))

        await db.query(`INSERT INTO arquivo (identificador, file, data) VALUES ($1, $2, $3);`, [

            identificador,
            file,
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

            arquivos = (await db.query("SELECT id, identificador, file, to_char(data, 'dd/MM/yyyy') as data FROM arquivo WHERE identificador = $1 ORDER BY id ASC;",[identificador])).rows

        } else {

            arquivos = (await db.query("SELECT id, identificador, file, to_char(data, 'dd/MM/yyyy') as data FROM arquivo ORDER BY id ASC;")).rows
 
        }

        return arquivos

    }

    async getFile(id:number) {

        return (await db.query("SELECT identificador, file FROM arquivo WHERE id = $1;",[id])).rows[0] as {identificador:string,file:Buffer}

    }
    
    async remove(id:number) {

        const identificador = String(await (await db.query(`delete from arquivo where id = ${id} returning identificador`)).rows[0].identificador)

        return identificador

    }

    static async init() {

        await db.query(`
            CREATE TABLE IF NOT EXISTS arquivo (

                id serial NOT NULL PRIMARY KEY,
                identificador character varying(100) NOT NULL,
                file bytea NOT NULL,
                data date NOT NULL

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