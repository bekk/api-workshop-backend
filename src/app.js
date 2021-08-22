import express from "express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const tilsynsListe = require("./data");

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

app.get("/tilsyn", (req, res) => {
  const postnummer = req.query.postnummer;
  const poststed = req.query.poststed;
  const smilefjes = req.query.smilefjes;

  const mappedJsonData = tilsynsListe.entries
    .map((tilsyn) => {
      return {
        navn: tilsyn.navn,
        poststed: tilsyn.poststed,
        postnummer: tilsyn.postnr,
        dato: tilsyn.dato,
        smilefjes: calculateSmilefjes(
          tilsyn.karakter1,
          tilsyn.karakter2,
          tilsyn.karakter3,
          tilsyn.karakter4
        ),
        tilsynsId: tilsyn.tilsynsobjektid,
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
    });

  res.send(mappedJsonData);
});

app.get("/tilsyn/:tilsynId", (req, res) => {
  const tilsyn = tilsynsListe.entries.find((tilsyn) => {
    return tilsyn.tilsynsobjektid.toString() == req.params.tilsynId;
  });
  const mappedTilsyn = {
    navn: tilsyn.navn,
    poststed: tilsyn.poststed,
    postnummer: tilsyn.postnr,
    dato: tilsyn.dato,
    smilefjes: calculateSmilefjes(
      tilsyn.karakter1,
      tilsyn.karakter2,
      tilsyn.karakter3,
      tilsyn.karakter4
    ),
    tilsynsId: tilsyn.tilsynsobjektid,
    rutinerOgLedelse: parseInt(tilsyn.karakter1, 10),
    lokalerOgUtstyr: parseInt(tilsyn.karakter2, 10),
    mathåndteringOgTilberedning: parseInt(tilsyn.karakter3, 10),
    merkingOgSporbarhet: parseInt(tilsyn.karakter4, 10),
  };

  res.send(mappedTilsyn);
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
