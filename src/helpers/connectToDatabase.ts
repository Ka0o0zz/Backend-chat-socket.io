import { connect } from "mongoose";

let connectionAttempts = 0;
const maxConnectionAttempts = 5;

export const connectToDatabase = async () => {
  try {
    await connect(process.env.MONGODB_URI ?? "");
    console.log("Connected to MongoDB");
  } catch (error) {
    if (connectionAttempts >= maxConnectionAttempts) {
      console.error(
        "Failed to connect to the database. Max connection attempts reached."
      );
      process.exit(1);
    }

    console.error("Error connecting to MongoDB:", error);
    connectionAttempts++;

    // Retry connection after a delay
    setTimeout(connectToDatabase, 2000);
  }
};
