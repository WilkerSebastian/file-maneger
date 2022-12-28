import { Router } from "express";
import indexController from "./app/controller/IndexController";
import fileController from "./app/controller/FileController";
import upload from "./upload";

const router = Router()

router.get("/", indexController.index)
router.post("/salvar/arquivo", upload.single("file"), fileController.salvar)
router.get("/buscar", fileController.listarPorIdentifcador)
router.get("/data/file/:id", fileController.getFile)
router.get("/deletar/file/:id", fileController.deletar)

export { router }; 