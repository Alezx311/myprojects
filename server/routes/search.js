const Router = require("express").Router();

const TYPES = ["bliss", "sound"];
const blissPath = "./public/images/bliss/";
const samplesPath = "./public/sounds/samples";

Router.get("/", (req, res) => {
  const query = req.query;
  const [[type, data]] = Object.entries(query);

  if (!TYPES.includes(type)) {
    res.status(500).send();
  }
});
module.exports = Router;
