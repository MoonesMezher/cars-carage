const Car = require("../database/models/Car");
const carSchema = require("../validation/carValidation");

const normalizePath = require("../helpers/normalizePathName");

const limit = 50;

const showCar = async (req, res) => {
    const { id } = req.params;

    const car = await Car.findById(id);

    if(!car) {
        return res.status(400).send({ state: 'failed', message: 'This car doesnot exist' });
    }

    const filter = {
        $or: [
            { brand: {
                EN: car.brand.EN,
                }
            },
            {
            category: {
                EN: car.category.EN,
                }
            },
            {
                gear: car.gear
            }
        ],
        _id: { $ne: id }
    };

    const total = await Car.countDocuments(filter);

    const otherCars = await Car.find(filter).limit(5);

    return res.status(200).send({ state: 'success', message: 'Get car successfully', car: car, other: {otherCars, total}});
}

const showCars = async (req, res) => {
    const { page } = req.params;

    try {
        const count = await Car.countDocuments({});

        const cars = await Car.find({}).skip((page - 1) * limit).limit(limit);

        return res.status(200).send({ state: 'success', message: 'Get cars successfully', cars: cars, total: count });
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message });        
    }
}

const showCarsByName = async (req, res) => {
    const { page, name } = req.params;

    if(!name) {
        return res.status(400).send({ state: 'failed', message: `You should insert a name to filter cars` });
    }

    if(typeof name !== 'string') {
        return res.status(400).send({ state: 'failed', message: `Name as attribute must be a string` });
    }

    try {
        const regex = new RegExp(`.*${name}.*`, 'i');

        const count = await Car.countDocuments({
            $or: [
                { 'name.AR': { $regex: regex} },
                { 'name.EN': { $regex: regex} }
            ]
        });

        const cars = await Car.find({
            $or: [
                { 'name.AR': { $regex: regex} },
                { 'name.EN': { $regex: regex} }
            ]
        }).skip((page - 1) * limit).limit(limit);

        return res.status(200).send({ state: 'success', message: `Get cars has name: ${name} successfully`, cars: cars, total: count });
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message });        
    }
}

const showCarsByBrand = async (req, res) => {
    const { page, brand } = req.params;

    if(!brand) {
        return res.status(400).send({ state: 'failed', message: `You should insert a brand to filter cars` });
    }

    if(typeof brand !== 'string') {
        return res.status(400).send({ state: 'failed', message: `Brand as attribute must be a string` });
    }

    try {
        const regex = new RegExp(`.*${brand}.*`, 'i');

        const count = await Car.countDocuments({
            $or: [
                { 'brand.AR': { $regex: regex} },
                { 'brand.EN': { $regex: regex} }
            ]
        });

        const cars = await Car.find({
            $or: [
                { 'brand.AR': { $regex: regex} },
                { 'brand.EN': { $regex: regex} }
            ]
        }).skip((page - 1) * limit).limit(limit);

        return res.status(200).send({ state: 'success', message: `Get cars has brand: ${brand} successfully`, cars: cars, total: count });
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message });        
    }
}

const showCarsByCategory = async (req, res) => {
    const { page, category } = req.params;

    if(!category) {
        return res.status(400).send({ state: 'failed', message: `You should insert a category to filter cars` });
    }

    if(typeof category !== 'string') {
        return res.status(400).send({ state: 'failed', message: `Category as attribute must be a string` });
    }

    try {
        const regex = new RegExp(`.*${category}.*`, 'i');

        const count = await Car.countDocuments({
            $or: [
                { 'category.AR': { $regex: regex} },
                { 'category.EN': { $regex: regex} }
            ]
        });

        const cars = await Car.find({
            $or: [
                { 'category.AR': { $regex: regex} },
                { 'category.EN': { $regex: regex} }
            ]
        }).skip((page - 1) * limit).limit(limit);

        return res.status(200).send({ state: 'success', message: `Get cars has category: ${category} successfully`, cars: cars, total: count });
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message });        
    }
}

const showCarsByPrice = async (req, res) => {
    const { page, price } = req.params;

    if(!price) {
        return res.status(400).send({ state: 'failed', message: `You should insert a price to filter cars` });
    }

    if(typeof price !== 'string') {
        return res.status(400).send({ state: 'failed', message: `Price as attribute must be a string` });
    }

    try {
        const count = await Car.countDocuments({
            $or: [
                { 'price.monthly': price},
                { 'price.weekly': price },
                { 'price.dayly': price} 
            ]
        });

        const cars = await Car.find({
            $or: [
                { 'price.monthly': price},
                { 'price.weekly': price },
                { 'price.dayly': price} 
            ]
        }).skip((page - 1) * limit).limit(limit);

        return res.status(200).send({ state: 'success', message: `Get cars hase price: ${price} successfully`, cars: cars, total: count });
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message });        
    }
}

const showCarsByHorse = async (req, res) => {
    const { page, horse } = req.params;

    if(!horse) {
        return res.status(400).send({ state: 'failed', message: `You should insert a horse to filter cars` });
    }

    if(typeof horse !== 'string') {
        return res.status(400).send({ state: 'failed', message: `Horse as attribute must be a string` });
    }

    try {
        const count = await Car.countDocuments({ 
            'horse': horse
        });

        const cars = await Car.find({ 
            'horse': horse
        }).skip((page - 1) * limit).limit(limit);

        return res.status(200).send({ state: 'success', message: `Get cars has horse: ${horse} successfully`, cars: cars, total: count });
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message });        
    }
}

const showCarsByModel = async (req, res) => {
    const { page, model } = req.params;

    if(!model) {
        return res.status(400).send({ state: 'failed', message: `You should insert a model to filter cars` });
    }

    if(typeof model !== 'string') {
        return res.status(400).send({ state: 'failed', message: `Model as attribute must be a string` });
    }

    try {
        const count = await Car.countDocuments({ 
            'model': model
        });

        const cars = await Car.find({ 
            'model': model
        }).skip((page - 1) * limit).limit(limit);

        return res.status(200).send({ state: 'success', message: `Get cars hase model: ${model} successfully`, cars: cars, total: count });
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message });        
    }
}

const showCarsBySpeed = async (req, res) => {
    const { page, speed } = req.params;

    if(!speed) {
        return res.status(400).send({ state: 'failed', message: `You should insert a speed to filter cars` });
    }

    if(typeof speed !== 'string') {
        return res.status(400).send({ state: 'failed', message: `Speed as attribute must be a string` });
    }

    try {
        const regexSpeed = new RegExp(`.*${speed}.*`, "i");

        const count = await Car.countDocuments({ 
            'topSpeed': { $regex: regexSpeed }
        });

        const cars = await Car.find({ 
            'topSpeed': { $regex: regexSpeed }
        }).skip((page - 1) * limit).limit(limit);

        return res.status(200).send({ state: 'success', message: `Get cars has speed: ${speed} successfully`, cars: cars, total: count });
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message });        
    }
}

const showCarsBySeatNumber = async (req, res) => {
    let { page, seatNumber } = req.params;

    if(!seatNumber) {
        return res.status(400).send({ state: 'failed', message: `You should insert a seatNumber to filter cars` });
    }

    seatNumber = parseInt(seatNumber, 10);

    if(typeof seatNumber !== 'number') {
        return res.status(400).send({ state: 'failed', message: `setNumber as attribute must be a number` });
    }

    try {
        const count = await Car.countDocuments({ 
            'seatNumber': seatNumber
        });

        const cars = await Car.find({ 
            'seatNumber': seatNumber
        }).skip((page - 1) * limit).limit(limit);

        return res.status(200).send({ state: 'success', message: `Get cars has seats: ${seatNumber} successfully`, cars: cars, total: count });
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message });        
    }
}

const showCarsByGear = async (req, res) => {
    let { page, gear } = req.params;

    if(!gear) {
        return res.status(400).send({ state: 'failed', message: `You should insert a gear to filter cars` });
    }

    if(typeof gear !== 'string') {
        return res.status(400).send({ state: 'failed', message: `Gear as attribute must be a string` });
    }

    try {
        const count = await Car.countDocuments({ 
            'gear': gear
        });

        const cars = await Car.find({ 
            'gear': gear
        }).skip((page - 1) * limit).limit(limit);

        return res.status(200).send({ state: 'success', message: `Get cars has gear: ${gear} successfully`, cars: cars, total: count });
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message });        
    }
}

const showCarsByColor = async (req, res) => {
    let { page, color } = req.params;

    if(!color) {
        return res.status(400).send({ state: 'failed', message: `You should insert a color to filter cars` });
    }

    if(typeof color !== 'string') {
        return res.status(400).send({ state: 'failed', message: `color as attribute must be a string` });
    }

    try {
        const count = await Car.countDocuments({ 
            'colors': { $in: color }
        });

        const cars = await Car.find({ 
            'colors': { $in: color }
        }).skip((page - 1) * limit).limit(limit);

        return res.status(200).send({ state: 'success', message: `Get cars has color: ${color} successfully`, cars: cars, total: count });
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message });        
    }
}

const showBrands = async (req, res) => {
    let { language } = req.params || 'AR';

    if(typeof language !== 'string') {
        return res.status(400).send({ state: 'failed', message: 'Language must be a string' });                
    }

    if(!(language == 'AR' || language == 'EN')) {
        return res.status(400).send({ state: 'failed', message: 'This language doesnot exist, you can choose only (AR, EN)' });                
    }

    try {
        const brands = await Car.distinct(`brand.${language}`);

        return res.status(200).send({ state: 'success', message: `Get cars brands successfully`, brands: brands});
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message });                
    }
}

const showCategories = async (req, res) => {
    let { language } = req.params || 'AR';

    if(typeof language !== 'string') {
        return res.status(400).send({ state: 'failed', message: 'Language must be a string' });                
    }

    if(!(language == 'AR' || language == 'EN')) {
        return res.status(400).send({ state: 'failed', message: 'This language doesnot exist, you can choose only (AR, EN)' });                
    }

    try {
        const categories = await Car.distinct(`category.${language}`);

        return res.status(200).send({ state: 'success', message: `Get cars categories successfully`, categories: categories});
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message });                
    }
}

const showCarsByGeneralFilter = async (req, res) => {
    const { page } = req.params;
    
    let {
        text
    } = req.body;

    if(!text) {
        text = '';        
    }

    try {
        const regex = new RegExp(`.*${text}.*`, 'i');

        const count = await Car.countDocuments({ 
            $or : [
                { 'name.AR': { $regex: regex }},
                { 'name.EN': { $regex: regex }},
                { 'brand.AR': { $regex: regex }},
                { 'brand.EN': { $regex: regex }},
                { 'category.AR': { $regex: regex }},
                { 'category.EN': { $regex: regex }},
            ]
        });

        const cars = await Car.find({ 
            $or : [
                { 'name.AR': { $regex: regex }},
                { 'name.EN': { $regex: regex }},
                { 'brand.AR': { $regex: regex }},
                { 'brand.EN': { $regex: regex }},
                { 'category.AR': { $regex: regex }},
                { 'category.EN': { $regex: regex }},
                { model: { $regex: regex }},
            ]
        }).skip((page - 1) * limit).limit(limit);

        return res.status(200).send({ state: 'success', message: `Get cars successfully`, cars: cars, total: count });
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message });        
    }
}

const createCar = async (req, res) => {
    let { 
        name_AR, name_EN, 
        brand_AR, brand_EN, 
        category_AR, category_EN,
        price_monthly, price_weekly, price_dayly,
        description_AR, description_EN,
        horse,
        model,
        seat_number,
        top_speed,
        gear,
        colors
    } = req.body;

    const files = req.files

    if(!files) {
        return res.status(400).send({ state: 'failed', message: 'You must insert a files as pictures' });        
    }
    const imgs = [];

    files.forEach(file => {
        let path = normalizePath(file);
        imgs.push(path);
    });

    const { error } = carSchema.validate({
        name_AR, name_EN, 
        brand_AR, brand_EN, 
        category_AR, category_EN,
        pictures: imgs,
        price_monthly, price_weekly, price_dayly,
        description_AR, description_EN,
        horse,
        model,
        seat_number,
        top_speed,
        gear,
        colors
    });

    if(error) {
        return res.status(400).send({ state: 'failed', message: error.details[0].message });        
    }

    const data = {
        name: { AR: name_AR, EN: name_EN }, 
        brand: { AR: brand_AR, EN: brand_EN }, 
        category: { AR: category_AR, EN: category_EN},
        pictures: imgs,
        price: { monthly: price_monthly, weekly: price_weekly, dayly: price_dayly },
        description: { AR: description_AR, EN: description_EN },
        horse,
        model,
        seatNumber: seat_number,
        topSpeed: top_speed,
        gear,
        colors
    }

    try {
        await Car.create(data);

        return res.status(200).send({ state: 'success', message: `Created car successfully`});
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message });        
    }
}

const updateCar = async (req, res) => {
    const { id } = req.params;

    const car = await Car.findById(id);

    if(!car) {
        return res.status(400).send({ state: 'failed', message: 'Car not found' });        
    }

    let { 
        name_AR, name_EN, 
        brand_AR, brand_EN, 
        category_AR, category_EN,
        price_monthly, price_weekly, price_dayly,
        description_AR, description_EN,
        horse,
        model,
        seat_number,
        top_speed,
        gear,
        colors
    } = req.body;

    const files = req.files

    if(!files) {
        return res.status(400).send({ state: 'failed', message: 'You must insert a files as pictures' });        
    }
    const imgs = [];

    files.forEach(file => {
        let path = normalizePath(file);
        imgs.push(path);
    });

    const { error } = carSchema.validate({
        name_AR, name_EN, 
        brand_AR, brand_EN, 
        category_AR, category_EN,
        pictures: imgs,
        price_monthly, price_weekly, price_dayly,
        description_AR, description_EN,
        horse,
        model,
        seat_number,
        top_speed,
        gear,
        colors
    });

    if(error) {
        return res.status(400).send({ state: 'failed', message: error.details[0].message });        
    }

    const data = {
        name: { AR: name_AR, EN: name_EN }, 
        brand: { AR: brand_AR, EN: brand_EN }, 
        category: { AR: category_AR, EN: category_EN},
        pictures: imgs,
        price: { monthly: price_monthly, weekly: price_weekly, dayly: price_dayly },
        description: { AR: description_AR, EN: description_EN },
        horse,
        model,
        seatNumber: seat_number,
        topSpeed: top_speed,
        gear,
        colors
    }

    try {
        await Car.findByIdAndUpdate(id, data);

        return res.status(200).send({ state: 'success', message: `Updated car successfully`});
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message });        
    }
}

const deleteCar = async (req, res) => {
    const { id } = req.params;

    const car = await Car.findById(id);

    if(!car) {
        return res.status(400).send({ state: 'failed', message: 'This car is already not exist'});
    }

    try {
        await Car.findByIdAndDelete(id);

        return res.status(200).send({ state: 'success', message: 'Deleted car successfully'});        
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message});       
    }
}

module.exports = {
    showCar,
    showCars,
    createCar,
    deleteCar,
    updateCar,
    showCarsByModel,
    showCarsByHorse,
    showCarsByBrand,
    showCarsByName,
    showCarsByPrice,
    showCarsBySeatNumber,
    showCarsBySpeed,
    showCarsByCategory,
    showBrands,
    showCategories,
    showCarsByGear,
    showCarsByColor,
    showCarsByGeneralFilter
}