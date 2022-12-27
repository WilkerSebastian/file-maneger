import multer from "multer"
import { extname, resolve} from "path"

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, resolve("./src/app/uploads"))

    },
    filename(req, file, cb) {

        cb(null, req.body.identificador + file.originalname.slice(file.originalname.lastIndexOf(".")))
        
    },

})

export default multer({storage})