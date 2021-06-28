const mongoose = require("mongoose");
const URI = process.env.URI;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
.then(() => {
    console.log("Connection with mongo is success");
})
.catch((err) => {
    console.log(err);
})