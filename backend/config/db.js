import { Sequelize } from "sequelize";

export const dbConn = async () => {
  const sequelize = new Sequelize(process.env.DB_URI);

  try {
    await sequelize.authenticate();
    console.log("Connection to database established successfully.");
  } catch (error) {
    console.log("Unable to connect to database", error);
  }
};
