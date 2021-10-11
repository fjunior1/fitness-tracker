const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const connectDb = async () => {
  await mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout',
    {
      useNewUrlParser: true,
      useFindAndModify:false,
      useCreateIndex:true,
      useUnifiedTopology: true 
    }
  )
  .then(() => {
    console.log("mongoDB connected.")
  })
  .catch(() => {
    console.log(err)
  })
}

connectDb().catch(err => console.log(err))
app.use(require("./routes/api.js"));
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}.`);
});
