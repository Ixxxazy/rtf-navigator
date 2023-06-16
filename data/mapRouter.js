const Router = require('express')
const mapRouter = new Router()
const{check} = require('express-validator')
const mapAdder = require('./mapAdder')

mapRouter.post('/map-add' , mapAdder.mapAdd)
mapRouter.get('/getMaps', mapAdder.getMaps)
mapRouter.get('/getMapById', mapAdder.getMapById)
mapRouter.get('/getMapByName', mapAdder.getMapByName)

module.exports = mapRouter