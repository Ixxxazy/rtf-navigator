const Building = require('./models/Map')
const{check} = require('express-validator')
const { validationResult } = require('express-validator')
class mapAdder {
    async mapAdd(req, res) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message: "Ошибка при добавлении здания", errors})
            }
            const { id, name, floors } = req.body
            const candidateId = await Building.findOne({id})

            if (candidateId) {
                return res.status(400).json({message: "Здание с таким id уже существует"})
            }
            const candidateName = await Building.findOne({name})
            if (candidateName) {
                return res.status(400).json({message: "Здание с таким именем уже существует"})
            }

            const building = new Building({ id, name, floors })
            await building.save()
            return res.json({message: "Здание успешно добавлено"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'error'})
        }
    }
    async getMapById(req, res) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message: "Ошибка при поиске здания", errors})
            }
            const { id } = req.body
            const oneMap = await Building.findOne({ "id": id })
            res.json(oneMap)
        } catch (e) {

        }
    }

    async getMapByName(req, res) {  
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message: "Ошибка при поиске здания", errors})
            }
            const { name } = req.body
            const oneMap = await Building.findOne({ "name": name })
            res.json(oneMap)
        } catch (e) {

        }
    }

    async getMaps(req, res) {
        try{
            const maps = await Building.find()
            res.json(maps)
        } catch (e) {

        }
    }

}
 module.exports = new mapAdder()