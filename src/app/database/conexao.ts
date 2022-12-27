import {Pool} from "pg"

export default new Pool({

    host:"localhost",
    user:"postgres",
    password:"postgres",
    database:"filemaneger",
    port:5432

})