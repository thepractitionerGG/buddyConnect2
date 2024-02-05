const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: 'dvl3rfp3o', 
  api_key: '199495448115874', 
  api_secret: 'sbRUCNbRBLxS16Td4oY37GwHqrI' 
});

module.exports = cloudinary;
