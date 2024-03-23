import { $ } from "bun";

const { POSTGRES_PASSWORD, POSTGRES_PORT } = Bun.env;

console.log("Starting Postgres...");
try {
  // TODO: Add a check to see if the container already exists
  // TODO: Add a check to see if the container is already running
  await $`docker run -p ${POSTGRES_PORT}:5432 -e POSTGRES_PASSWORD=${POSTGRES_PASSWORD} -d --name task-stash-db postgres`.catch();
  // TODO: Write the container ID to a file, so we can stop it later with another script
  console.log("Postgres started!");
} catch (e) {
  console.error(e);
}
