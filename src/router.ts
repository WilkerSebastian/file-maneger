import { Router } from "express";
import indexController from "./app/controller/IndexController";
import fileController from "./app/controller/FileController";
import upload from "./upload";

const router = Router()

router.get("/", indexController.index)
router.post("/salvar/arquivo", upload.single("file"), fileController.salvar)

export { router }; 