const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/controller");

// ========== ALUNOS ==========
router.get("/alunos", ctrl.alunoListar);
router.get("/alunos/:id", ctrl.alunoBuscar);
router.post("/alunos", ctrl.alunoCriar);
router.put("/alunos/:id", ctrl.alunoAtualizar);
router.delete("/alunos/:id", ctrl.alunoDeletar);

// ========== PROFESSORES ==========
router.get("/professores", ctrl.profListar);
router.get("/professores/:id", ctrl.profBuscar);
router.post("/professores", ctrl.profCriar);
router.put("/professores/:id", ctrl.profAtualizar);
router.delete("/professores/:id", ctrl.profDeletar);

// ========== NOTAS ==========
router.get("/notas", ctrl.notaListar);
router.get("/notas/:id", ctrl.notaBuscar);
router.post("/notas", ctrl.notaCriar);
router.put("/notas/:id", ctrl.notaAtualizar);
router.delete("/notas/:id", ctrl.notaDeletar);

module.exports = router;
