const { Router } = require('express');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const{ Character,Occupation} = require('../db');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    const apiUrl = await axios.get("https://breakingbadapi.com/api/characters");
    const apiInfo = await apiUrl.data.map(el => {
        return {
            name: el.name,
            img: el.img,
            nickname: el.nickname,
            status: el.status,
            id: el.char_id,
            occupation : el.occupation.map(el => el),
            birthday: el.birthday,
            appearance: el.appearance.map(el=> el)
        }
    })
    return apiInfo
};

   //si deespués quiero crear este personaje , si no incluyo este modelo,nunca me va a crear el personaje con la ocupacion
const getDbInfo = async()=>{
    return await Character.findAll({
      include:{
        model: Occupation,
        attributes: ['name'],
        // en la doc no dice nada de aplicar lo de abajo
        // https://sequelize.org/master/manual/model-querying-basics.html
        through:{ attributes: [],
      }
      }}
    )
};

const getAllCharacters = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
     return infoTotal;
    // console.log(infoTotal)
};

// getAllCharacters() → [{},{}]

router.get("/characters", async (req,res)=>{
    const {name} = req.query;
    let charactersTotal = await getAllCharacters();
    if(name){
        let characterName = await charactersTotal.filter(e=> e.name.toLowerCase().includes(name.toLowerCase()))
        characterName.length ? 
        res.status(200).send(characterName) :
        res.status(404).send("No está el personaje solicitado")
    }else{
        res.status(200).send(charactersTotal)
    }
});
/**
 GET /ocupaciones:
Obtener todas las ocupaciones posibles
En una primera instancia deberán obtenerlas
 desde la API externa y guardarlas en su propia base de datos 
 y luego ya utilizarlas desde allí
 */


 router.get("/occupations",async(req,res)=>{
    const occupationsApi = await axios.get("https://breakingbadapi.com/api/characters")
    const occupations = occupationsApi.data.map(el=> el.occupation) // []
    const occEach = occupations.map(el=>{
        for (let i = 0; i < el.length; i++) return el[i]}) 
        //  console.log(occEach)
        occEach.forEach(el => {
           // accedo a la tabla Occupation y encuentro/ o creo en la prop nombre y le seteo el "el"(que va hacer la ocupación)
                 Occupation.findOrCreate({ 
                where: {name: el }
            })
        })
        const allOccupations = await Occupation.findAll();
        res.send(allOccupations)
 });


 router.post("/character", async(req,res)=>{
     let { 
        name,
        nickname,
        birdthday,
        img,
        status,
        createdInDb,
        occupation
        } = req.body;

        let characterCreated = await Character.create({
            name,
            nickname,
            birdthday,
            img,
            status,
            createdInDb,
            //no le paso occupation porque tengo que hacer la relacion aparte
        })

        let occupationDb = await Occupation.findAll({ where:{ name: occupation } })

        characterCreated.addOccupations(occupationDb)
        res.send("Personaje creado con éxito")
 })


 router.get("/characters/:id", async(req,res)=>{
     const {id} = req.params;
     const charactersTotal = await getAllCharacters();

     if(id){
         let characterId = await charactersTotal.filter(el => el.id == id)
         characterId.length ?
         res.status(200).json(characterId) :
         res.status(404).send("No encontré ese personaje")
     }
 })




module.exports = router;
