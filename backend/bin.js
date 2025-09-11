import cluster from "cluster";
import os from "os";
import app from "./index.js";

const totalCPUs = os.cpus().length;
const PORT = 3000;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running with ${totalCPUs} CPUs`);

  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", () => {
    cluster.fork();
  });
} else {
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} running on port ${PORT}`);
  });
}
