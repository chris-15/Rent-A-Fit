const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rent-a-fit', {
 // no longer needed in mongoose 6.0, they are already implied 
//  useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false
});

module.exports = mongoose.connection;