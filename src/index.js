require("dotenv").config();
const debug = require("debug")("elonceideal:root");
const chalk = require("chalk");
const initializeServer = require("./server/initializeServer");

const port = process.env.PORT ?? 4000;

(async () => {
  try {
    await initializeServer(port);
  } catch {
    debug(chalk.red("Exiting with errors"));
    process.exit(1);
  }
})();
