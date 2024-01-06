module.exports = (app) => {
    const interaction = require("../controller/interaction.controller");
    const { log } = require("../utils/utils");
    const { jwtCheck } = require("../utils/utils");

    const router = require("express").Router();

    router.get("/history", jwtCheck, async (req, res) => {
        log(`History: ${JSON.stringify(req.query)}`);
        if (!"email" in req.query || !"accountType" in req.query) {
            res.status(400);
            res.send({
                error: "email not found in query params",
            });
            return;
        }
        const result = await interaction.get(req);
        res.send(result);
    });

    app.use("/api/interaction", router);
};
