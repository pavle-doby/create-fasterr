#!/usr/bin/env node

import inquirer from "inquirer";
import { execa } from "execa";
import { join } from "path";
import { existsSync, rmSync } from "fs";
import { mkdirSync } from "fs";
import degit from "degit";
import chalk from "chalk";
import { pastel } from "gradient-string";
import { welcome } from "./utils/welcome";

async function main() {
  // Show welcome message
  await welcome();

  // Ask for project name
  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Enter project name:",
      default: "my-dream-project",
    },
  ]);

  const repoUrl = "pavle-doby/shipping-fasterr";
  const targetDir = join(process.cwd(), projectName);

  // Check if directory already exists
  if (existsSync(targetDir)) {
    console.log();
    console.log(
      chalk.red(
        `❌ Directory "${projectName}" already exists. Choose another name.`
      )
    );
    console.log();

    process.exit(1);
  }

  // Create directory for a project
  console.log();
  console.log(chalk.green(`📂 Creating project in:`), targetDir);
  mkdirSync(targetDir);

  try {
    // Download template
    console.log(
      chalk.cyan(`📥 Downloading template from: `),
      `https://github.com/${repoUrl}`
    );
    await degit(repoUrl).clone(targetDir);

    // Remove .git history
    console.log(chalk.yellow(`🔄 Removing .git history...`));
    rmSync(join(targetDir, ".git"), { recursive: true, force: true });

    // Install dependencies
    console.log(
      chalk.blue(`📦 Installing dependencies. This may take a few minutes...`)
    );
    console.log();
    await execa("yarn", { cwd: targetDir, stdio: "inherit" });

    // Done
    console.log();
    console.log(chalk.green(`✅ Done! Your project is ready.`));
    console.log();

    // Show instructions
    console.log(pastel.multiline(Array(70).join("-")));
    console.log();

    console.log(
      chalk.bold(`cd ${projectName}`),
      chalk.reset(` | Go to your project directory`)
    );

    console.log();
    console.log(
      chalk.bold(`yarn web   `),
      chalk.reset(" | To run web (next) app")
    );

    console.log(
      chalk.bold(`yarn native`),
      chalk.reset(" | To run native (expo) app")
    );

    console.log();
    console.log(pastel.multiline(Array(70).join("-")));

    // Show final message
    console.log();
    console.log(pastel.multiline("🚀 Happy coding from DOBY! 🚀"));

    console.log();
  } catch (error) {
    console.error(chalk.red("❌ Error:"), error);
    process.exit(1);
  }
}

main();
