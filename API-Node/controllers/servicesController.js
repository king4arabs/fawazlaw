const Service = require('../models/Service'); // Adjust the path according to your project structure

exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find({});
        res.status(200).json(services);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.createService = async (req, res) => {
    try {
        const service = new Service(req.body);
        if (req.files && req.files.thumbnail) {
            service.thumbnail = req.files.thumbnail.path;
        }
        await service.save();
        res.status(201).json(service);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateService = async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.deleteService = async (req, res) => {
    try {
        const service = await Service.findByIdAndRemove(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};
