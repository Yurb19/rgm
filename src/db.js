const mongoose = require("mongoose");
const { uri } = require("./config/index");
const URI = uri;

(async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('Database Connected');
  } catch (error) {
      console.log(error);
  }
})();