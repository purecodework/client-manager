const controller = require("../controllers/client-controller");
const router = require("express").Router();
const { findClient } = require("../middleware/find-client");

router.get("/", controller.getAllClients);
router.post("/", controller.createClient);
router.get("/search", controller.getClientByName);
router.put("/:id", findClient, controller.updateClient);
router.delete("/:id", findClient, controller.deleteClient);

module.exports = router;
