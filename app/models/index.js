
import Sequelize from "sequelize";
import fs from "node:fs";
import dbConfig from "../config/db.config.js";

import userModel from "./user.model.js";
import roleModel from "./role.model.js";

const useSSL = process.env.DB_SSL === "true";

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    port: dbConfig.PORT,
    dialectOptions: useSSL
      ? {
          ssl: {
            ca: fs.readFileSync(
              process.env.DB_SSL_CA_PATH,
              "utf8"
            ),
            rejectUnauthorized: true,
          },
        }
      : {},
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = userModel(sequelize, Sequelize);
db.role = roleModel(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  as: "users",
  foreignKey: "roleId",
  otherKey: "userId",
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
  as: "roles",
});

db.ROLES = ["user", "admin", "moderator"];

export default db;
