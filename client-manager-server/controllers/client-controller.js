const Client = require("../models/client");
const { Sequelize, Op } = require("sequelize");

function handleErrorResponse(res, error, statusCode = 500) {
  let errorMessage = "Internal Server Error";
  let errorDetails = [error.message];

  if (error instanceof Sequelize.ValidationError) {
    statusCode = 400;
    errorMessage = "Validation failed";
    errorDetails = error.errors.map((err) => err.message);
  } else if (error instanceof Error && error.message === "Client not found") {
    statusCode = 404;
    errorMessage = error.message;
  }

  // console.error("\u{1F6D1} Error:", error);
  return res.status(statusCode).json({
    msg: errorMessage,
    errors: errorDetails,
  });
}

exports.getAllClients = (req, res, next) => {
  Client.findAll()
    .then((clients) => res.status(200).json({ clients: clients }))
    .catch((error) => handleErrorResponse(res, error));
};

exports.getClientByName = (req, res, next) => {
  const name = req.query.name;
  Client.findAll({
    where: {
      name: {
        [Op.iLike]: `${name}%`,
      },
    },
  })
    .then((clients) => res.status(200).json({ clients: clients }))
    .catch((error) => handleErrorResponse(res, error));
};

exports.createClient = (req, res, next) => {
  const { name, dateOfBirth, mainLanguage, secondaryLanguage, fundingSource } =
    req.body;
  Client.create({
    name,
    dateOfBirth,
    mainLanguage,
    secondaryLanguage,
    fundingSource,
  })
    .then((client) => res.status(201).json({ msg: "Client created", client }))
    .catch((error) => handleErrorResponse(res, error));
};

exports.updateClient = (req, res) => {
  const client = req.client;
  const updates = req.body;
  Object.keys(updates).forEach((key) => {
    if (client[key] !== undefined && updates[key] !== undefined) {
      client[key] = updates[key];
    }
  });
  client
    .save()
    .then((updatedClient) =>
      res
        .status(200)
        .json({ msg: "Client updated successfully", client: updatedClient })
    )
    .catch((error) => handleErrorResponse(res, error));
};

exports.deleteClient = (req, res) => {
  const id = req.params.id;
  Client.findByPk(id)
    .then((client) => {
      if (!client) {
        throw new Error("Client not found");
      }
      return client.destroy();
    })
    .then(() => res.status(204).send())
    .catch((error) => handleErrorResponse(res, error));
};
