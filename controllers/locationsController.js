const Location = require('../models/location')
const axios = require('axios');
const asyncWrapper = require('../middleware/async')

const createLocation = asyncWrapper  (
    async (req, res) => {

        const start_time = process.hrtime() // note the start time
        const { longitude, latitude } = req.body

        const locationObject = {
            type: "Point",
            coordinates: [longitude, latitude]
        };
        
        const locationData = { ...req.body, location: locationObject };

        const location = await Location.create(locationData) // create from req.body data

        const end_time = process.hrtime(start_time)        
        res.status(201).json({ 
            id: location._id,
            response_time: `${end_time[1]} ns`
        })
    }
)

const getAllLocations = asyncWrapper ( async (req, res)=>{
    const start_time = process.hrtime() // note the start time
    const locations = await Location.find({})  
    const end_time = process.hrtime(start_time) 
        res.status(200).json({ 
            locations , 
            "Hits" :locations.length,
            response_time: `${end_time[1]} ns`
        })   
    }
)

const getLocationsByCategory = asyncWrapper (async (req, res) => {
    const start_time = process.hrtime() // note the start time

    const {category} = req.params
    const locations = await Location.find({ category })
        const end_time = process.hrtime(start_time)
        if (locations.length!=0){
            res.status(200).json({ 
                locations,
                "Hits" :locations.length,
                response_time: `${end_time[1]} ns`
            })
        }else {
            res.send('No matches')
        }
        
    }
)

const searchLocations = asyncWrapper (
    async (req, res) => {
        const start_time = process.hrtime() // note the start time
        const { latitude, longitude, category, radius_km } = req.body

        const locations = await Location.find({
            category,
            location:{ 
                $near:{
                    $geometry: {type: "Point", coordinates: [longitude, latitude]},
                    $maxDistance: radius_km * 1000
                }
            }
        })

        const locationsWithDistance = locations.map(location => ({
            id: location._id,
            name: location.name,
            address: location.address,
            distance: `${calculateDistance(longitude, latitude,  location.location.coordinates[0], location.location.coordinates[1])} Kms`,
            category: location.category
        }))

        const end_time = process.hrtime(start_time)
        res.status(200).json({ 
            locations: locationsWithDistance,
            "Hits" :locations.length,
            response_time: `${end_time[1]} ns`
        })
    }
)

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers

    return distance.toFixed(5);
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}


const calculateTripCost = asyncWrapper(
    async (req, res) => {
        const start_time = process.hrtime()

        const { location_id } = req.params // input from url parameter //
        const { longitude, latitude } = req.body        
            
        const destination = await Location.findById(location_id)
        if (!destination){
            return res.status(404).json({
                error: 'Destination location not found'
            })
        }

        try {
            const tollGuruAPIKey = process.env.TOLLGURU_API_KEY
            const tollGuruEndpoint = 'https://apis.tollguru.com/toll/v2/origin-destination-waypoints'
            
            const sourceCoordinates = [longitude, latitude];
            const destinationCoordinates = destination.location.coordinates;
            console.log('TollGuru API Request Payload:', {
                source: sourceCoordinates,
                destination: destinationCoordinates,
                vehicleType: '2AxlesAuto',
            })

            const response = await axios.post(tollGuruEndpoint, {
                source: sourceCoordinates,
                destination: destinationCoordinates,
                vehicleType: '2AxlesAuto', // Adjust based on your vehicle type
            },
            {
                headers: {
                    'x-api-key': tollGuruAPIKey,
                    'Content-Type': 'application/json', // Add this line if not set automatically
                },
            }
        );
            
        
            const tollCost = response.data.summary.tollFares.totalFare;
            const end_time = process.hrtime(start_time)
            res.status(200).json({
                toll_cost: tollCost,
                response_time: `${end_time[1]} ns`
            })

        } catch (error) {
            console.error('Error calling TollGuru API',error)
            res.status(500).json({
                error: 'Error fetching trip cost from TollGuru',
            })
        }
        
    }
) 


module.exports = {
    createLocation, // - Add a location,
    getLocationsByCategory, // - get by category,
    searchLocations,  //  - search by radius ,
    calculateTripCost,
    getAllLocations
}