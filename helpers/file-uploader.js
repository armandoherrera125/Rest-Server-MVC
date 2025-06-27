const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const fileUploader = (file) => {
    const uploadDir = path.join(__dirname, '../uploads');
    const fileName = `${uuidv4()}-${file.name}`;
    const uploadPath = path.join(uploadDir, fileName);
    //Verificamos si el directorio para grabar imagenes existe, si no lo creamos
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    //Devolvemos una promesa en base a la respuesta del metodo mv de express file upload
    return new Promise((resolve, reject) => {
        file.mv(uploadPath, (error) => {
            if (error) return reject(error);
            resolve({fileName, uploadPath});
        });
    });

}

module.exports = fileUploader;