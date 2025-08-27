import { Sequelize } from "sequelize";

export const dbConn = async () => {
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,

    process.env.DB_PASS,
    {
      dialect: "postgres",
    }
  );
  try {
    await sequelize.authenticate();
    console.log("Connection to database established successfully.");
  } catch (error) {
    console.log("Unable to connect to database", error);
  }
};
