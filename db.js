const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  try {
    const db = process.env.MONGO_URI;

    const conn = await mongoose.connect(db, {
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    console.log('We\'ve hacked Mongo, we made it to the mainframe'.cyan);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = connectDB;