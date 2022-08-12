import { Sequelize } from "sequelize";
import db from "../config/database.js";
 

const { DataTypes } = Sequelize;
 

const Todo = db.define('todos', {

  activity_group_id: {
    type: DataTypes.INTEGER,
    references: { model: 'activity', key: 'id' },
    allowNull: false
  },
  title: {
    type: DataTypes.STRING
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  priority: {
    type: DataTypes.ENUM('Very-High','High','Medium','Low','Very-Low')
  }
},{
  freezeTableName: true
});
 

export default Todo;