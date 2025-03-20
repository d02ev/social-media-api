import logger from "../util/logger.util";

const initServer = (port, app) => {
	app.listen(port, () => logger.info(`Server at http://localhost:${port}`));
};

export default initServer;
