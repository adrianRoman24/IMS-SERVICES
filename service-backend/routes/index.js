const donorRoutes = require("./donor.routes");
const refugeeRoutes = require("./refugee.routes");
const requestRoutes = require("./request.routes");
const interactionRoutes = require("./interaction.routes");

module.exports = (app) => {
    donorRoutes(app);
    refugeeRoutes(app);
    requestRoutes(app);
    interactionRoutes(app);
};
