const { check } = require('express-validator');

const fileValidator = [
  check('file')
    .custom((value, { req }) => {
      if (!req.files || !req.files.file) {
        throw new Error('Archivo es requerido');
      }

      const file = req.files.file;

      // Validar tipo MIME
      const mimeTypesPermitidos = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!mimeTypesPermitidos.includes(file.mimetype)) {
        throw new Error('Tipo de archivo no permitido');
      }

      // Validar tamaño (ej. máx 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        throw new Error('El archivo excede el tamaño máximo permitido (5MB)');
      }

      return true;
    })
];

module.exports = fileValidator;
