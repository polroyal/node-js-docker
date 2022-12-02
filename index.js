const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const redis = require('redis');
// Define Redis store
let RedisStore = require('connect-redis')(session);
// Define Redis client

const { MONGO_USER, 
        MONGO_PASSWORD, 
        MONGO_IP, 
        MONGO_PORT, 
        REDIS_URL, 
        REDIS_PORT, 
        SESSION_SECRET, 
    } = require('./config/config');

    let redisClient = redis.createClient({
        host: REDIS_URL, 
        port: REDIS_PORT,
        legacyMode: true,
    })
    redisClient.connect().catch(console.error);
    

const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

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

//  app.enable('trust proxy')
 app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        // resave: false,
        // saveUninitialized: false,
        httpOnly: false,
        maxAge: 60000,
    },
 })
 );


 app.use(express.json());


app.get("/", (req, res) => {
    res.send("<h2>Hi there Pol, aki wewe </h2>");
    console.log('Yes it works')
});

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`))