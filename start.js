const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });



// Connecting to Database and handling any bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => console.error(err.message));

require('./models/User');

const app = require('./app');
app.set('port', process.env.PORT || 8080);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running: PORT ${server.address().port}`);
});
