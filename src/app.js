import express from "express";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const tilsynsListe = require("./data");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
var cors = require("cors");

const app = express();

const port = process.env.PORT || 3003;

app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/tilsyn", (req, res) => {
  const postnummer = req.query.postnummer;
  const poststed = req.query.poststed;
  const smilefjes = req.query.smilefjes;

  const mappedJsonData = tilsynsListe
    .map((tilsyn) => {
      return {
        navn: tilsyn.navn,
        poststed: tilsyn.poststed,
        postnummer: tilsyn.postnummer.toString(),
        dato: tilsyn.dato.toString(),
        smilefjes: tilsyn.smilefjes,
        tilsynsId: tilsyn.tilsynsId,
      };
    })
    .filter((tilsyn) => {
      if (!postnummer || postnummer == "undefined") {
        return true;
      } else {
        return tilsyn.postnummer == postnummer;
      }
    })
    .filter((tilsyn) => {
      if (!poststed || poststed == "undefined") {
        return true;
      } else {
        return tilsyn.poststed == poststed;
      }
    })
    .filter((tilsyn) => {
      if (!smilefjes || smilefjes == "undefined") {
        return true;
      } else {
        return tilsyn.smilefjes == smilefjes;
      }
    })
    .slice(0, 200);

  res.send(mappedJsonData);
});

app.get("/tilsyn/:tilsynsId", (req, res) => {
  const tilsyn = tilsynsListe.find((tilsyn) => {
    return tilsyn.tilsynsId.toString() == req.params.tilsynsId;
  });

  res.send(tilsyn);
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
