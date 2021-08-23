import express from "express";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const tilsynsListe = require("./data");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
var cors = require("cors");

const app = express();

const port = process.env.PORT || 3003;

function calculateSmilefjes(karakter1, karakter2, karakter3, karakter4) {
  const highestValue = Math.max(karakter1, karakter2, karakter3, karakter4);
  switch (highestValue) {
    case 0:
      return "BLID";
    case 1:
      return "BLID";
    case 2:
      return "NØYTRAL";
    case 3:
      return "SUR";
    default:
      break;
  }
}

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
        postnummer: tilsyn.postnummer,
        dato: tilsyn.dato,
        smilefjes: calculateSmilefjes(
          tilsyn.rutinerOgLedelse,
          tilsyn.lokalerOgUtstyr,
          tilsyn.mathåndteringOgTilberedning,
          tilsyn.merkingOgSporbarhet
        ),
        tilsynsId: tilsyn.tilsynsId,
      };
    })
    .filter((tilsyn) => {
      if (!postnummer) {
        return true;
      } else {
        return tilsyn.postnummer == postnummer;
      }
    })
    .filter((tilsyn) => {
      if (!poststed) {
        return true;
      } else {
        return tilsyn.poststed == poststed;
      }
    })
    .filter((tilsyn) => {
      if (!smilefjes) {
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
