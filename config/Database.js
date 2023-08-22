import {Sequelize} from "sequelize";

const db = new Sequelize('pajak', 'root', 'root', {
    host: "localhost",
    dialect: "mysql"
});

export default db;