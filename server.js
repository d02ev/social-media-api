const Express = require('express');

const HandleError = require('./middlewares/error-handling.middleware');

const UserRoutes = require('./routes/user.routes');

require('dotenv').config();

const App = Express();

App.use(Express.json());
App.use(Express.urlencoded({ extended: true }));

App.use('/api', UserRoutes);

App.use(HandleError);

const CONN_PORT = process.env.PORT || 3000;
App.listen(
    CONN_PORT,
    () => console.log(`Your app is live at http://localhost:${CONN_PORT}`)
);