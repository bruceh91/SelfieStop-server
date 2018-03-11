import { join } from 'path';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import stateRouting from './middleware/routing.mw';
import configurePassport from './config/passport';
import bodyParser from 'body-parser';




// const CLIENT_PATH = join(__dirname, '../../client');

let app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json())
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({extended: true, limit: "50mb"}));

// app.use(express.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

configurePassport(app);

app.use('/api', routes);


app.use(stateRouting);

let port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
