import { Sequelize } from "sequelize";
import db from "../config/database.js";
 

const { DataTypes } = Sequelize;
 

const Todo = db.define('activitys', {
  title: {
    type: DataTypes.STRING
  },
  email:{
    type: DataTypes.STRING
  }
},{
  freezeTableName: true
});
 

export default Todo;