const Client = require("../models/client");

exports.findClient = (req, res, next) => {
  const id = req.params.id;
  Client.findByPk(id)
    .then((client) => {
      if (!client) {
        res.status(404).json({ msg: "Client not found" });
        return;
      }
      req.client = client;
      next();
    })
    .catch((error) => {
      res.status(500).json({ msg: error.message });
    });
};
