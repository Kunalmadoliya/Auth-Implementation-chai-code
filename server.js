import "dotenv/config";
import app from "./src/app.js";
import connectToDB from "./src/common/config/db.js";

const PORT = process.env.PORT || 4000;

const start = async () => {
await connectToDB()
  app.listen(PORT, () => {
    console.log(`Server is running at ${PORT} in ${process.env.NODE_ENV}`);
  });
};

start().catch((err) => {
  console.log(err);
  process.exit(1);
});
