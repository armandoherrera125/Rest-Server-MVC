const bcrypt = require('bcryptjs');

const bcryptPassword = ( password ) => bcrypt.hashSync(password, 10)

const checkbcryptPassword = ( password , userPassword ) => 
    bcrypt.compareSync( password, userPassword ); 



module.exports = {
    bcryptPassword,
    checkbcryptPassword
}