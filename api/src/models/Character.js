
//Models are the essence of Sequelize. A model is an abstraction that represents a table in your database. In Sequelize, it is a class that extends Model.



const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('character', {
    //IMPORTANTE: Pensar como modelar los IDs de los personajes en la base de datos. Existen distintas formas correctas de hacerlo pero tener en cuenta que cuando hagamos click en alguno, este puede provenir de la API o de la Base de Datos por lo que cuando muestre su detalle no debería haber ambigüedad en cual se debería mostrar.
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    birdthday:{
        type: DataTypes.STRING, // el endpoint de la API es string
        allowNull: false,
    },
    status:{
      type: DataTypes.ENUM('Alive','Deseased','Presumed dead','Unknown'),
      allowNull: true,
    },
    img:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdInDb:{// Distinsion para saber que lo creé en DB
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // por defecto es null / aca le establezco un valor, en este caso un boleano pero podria ser cualquier tipo de dato.https://sequelize.org/v7/manual/model-basics.html#default-values
    }
  },
  {
    timestamps:false
  }
  );
};
