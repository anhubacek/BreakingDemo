

//Models are the essence of Sequelize. A model is an abstraction that represents a table in your database. In Sequelize, it is a class that extends Model.


const { DataTypes} = require("sequelize");

module.exports=(sequelize)=>{
    sequelize.define('occupation',{
        name:{
            type: DataTypes.STRING,
        },
        // en este caso no va haber ambiguedad en el Id, Sequelize lo va a crear por si solo
    },
    {
        timestamps:false
    })
}