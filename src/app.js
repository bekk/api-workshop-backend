import express from "express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const tilsynsListe = require("./data");


const app = express();

const port = process.env.PORT || 3003;

function calculateSmilefjes(karakter1, karakter2, karakter3, karakter4){
  const highestValue = Math.max(karakter1, karakter2, karakter3, karakter4)
  switch (highestValue) {
    case 0:
      return "GLAD"
    case 1:
      return "GLAD"
    case 2:
      return "NØYTRAL"
    case 3:
      return "SUR"
    default:
      break;
  }
}

app.get("/tilsyn", (req, res) => {
  const mappedJsonData = tilsynsListe.entries
  .map(
    (tilsyn => 
      {
        return {
         navn: tilsyn.navn,
         poststed: tilsyn.poststed,
         postnr: tilsyn.postnr,
         dato: tilsyn.dato,
         smilefjes: calculateSmilefjes(tilsyn.karakter1,tilsyn.karakter2,tilsyn.karakter3,tilsyn.karakter4)
        }
      })
  )

  res.send(mappedJsonData);
});

app.get("/tilsyn/:tilsynId", (req, res) => {
  console.log(req.params.tilsynId);
  res.send(req.params);
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
