const express = require('express')

const router = express.Router()

const {createLocation, searchLocations, getLocationsByCategory, calculateTripCost, getAllLocations} = require('../controllers/locationsController')

router.route('/locations').get(getAllLocations).post(createLocation)
router.route('/locations/:category').get(getLocationsByCategory)
// router.route('/locations').get(getLocationsByCategory)
// router.route('/locations/:category').get(getLocationsByCategory)

// Define other routes here
router.route('/search').post(searchLocations);
router.route('/trip-cost/:location_id').post(calculateTripCost);

module.exports = router