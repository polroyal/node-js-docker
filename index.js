const express = require('express');
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config/config');


const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRouter');

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {

    mongoose.connect(mongoURL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useFindAndModify: false
     })
     .then(() => console.log('Connected to MongoDB'))
     .catch((e) => {
        console.log(e);
        setTimeout(connectWithRetry, 5000) // keep trying db connection until it connects
    });
};
 connectWithRetry();

 app.use(express.json());


app.get("/", (req, res) => {
    res.send("<h2>Hi there Pol, aki wewe </h2>");
});

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`))