const Service = require('../models/Service'); // Adjust the path according to your project structure
const multer = require('multer');
const path = require('path'); // Make sure to require path module

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // Specify the path where images will be stored
        cb(null, './ServiceImages/');
    },
    filename: function(req, file, cb) {
        // Generate a unique name for each uploaded file using the current timestamp
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find({});
        res.status(200).json(services);
    } catch (error) {
        res.status(500).send(error);
    }
};

// exports.createService = upload.single('thumbnail').async((req, res) => {
//     try {
//       const serviceData = req.body;
  
//       // Validate service data (optional)
//       // ...
  
//       const service = new Service(serviceData);
  
//       // Check for uploaded file and validate (optional)
//       if (req.file) {
//         const allowedExtensions = ['png', 'jpg', 'jpeg']; // Example allowed extensions
//         const ext = path.extname(req.file.originalname).toLowerCase();
//         if (!allowedExtensions.includes(ext)) {
//           return res.status(400).json({ error: 'Invalid file type' });
//         }
  
//         // Generate a unique filename with timestamp
//         const timestamp = Date.now();
//         const filename = `${timestamp}-${req.file.originalname}`;
//         service.thumbnail = path.join(__dirname, 'uploads', filename);
  
//         // Move the uploaded file (assuming you have a 'uploads' directory)
//         await req.file.mv(service.thumbnail);
//       }
  
//       await service.save(); // Assuming a promise-based save method
  
//       res.status(201).json(service);
//     } catch (error) {
//       console.error(error); // Log the error for debugging
//       // Handle specific error types (optional)
//       res.status(500).json({ error: 'An error occurred' }); // Generic error message for now
//     }
//   });
exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findOne({ service_id: req.params.serviceId });
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).send(error);
    }
};

// exports.updateService = async (req, res) => {
//     try {
//         const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!service) {
//             return res.status(404).json({ message: 'Service not found' });
//         }
//         res.status(200).json(service);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };

// exports.deleteService = async (req, res) => {
//     try {
//         const service = await Service.findByIdAndRemove(req.params.id);
//         if (!service) {
//             return res.status(404).json({ message: 'Service not found' });
//         }
//         res.status(200).json({ message: 'Service deleted successfully' });
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };
