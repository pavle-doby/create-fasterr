import chalk from "chalk";
import figlet from "figlet";
import { pastel } from "gradient-string";

export async function welcome() {
  return new Promise((resolve) => {
    console.log();
    console.log(chalk.magenta("🚀 Welcome to"));

    figlet("Create Fasterr", (error, data) => {
      if (error) {
        console.log(chalk.magenta("Create Fasterr"));
      } else {
        console.log();
        console.log(pastel.multiline(data!));
        console.log();
      }

      resolve(true);
    });
  });
}
