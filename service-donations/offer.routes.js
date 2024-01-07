module.exports = (app) => {
    const offer = require("../service-donations/offer.controller");
    const { log } = require("../utils/utils");
    const { jwtCheck } = require("../utils/utils");

    const router = require("express").Router();

    router.get("/viewAll", jwtCheck, async (req, res) => {
        log(`View all offers: ${JSON.stringify(req.query)}`);
        if (!"offset" in req.query) {
            res.status(400);
            res.send({
                error: "offset not found in query params",
            });
            return;
        }
        const result = await offer.getAll(req);
        res.send(result);
    });

    router.post("/publish", jwtCheck, async (req, res) => {
        log(`Publish offer: ${JSON.stringify(req.body)}`);
        if (!"location" in req.body || !"donorEmail" in req.body || !"type" in req.body
            || !"description" in req.body || !"capacity" in req.body) {
            req.status(400);
            res.send({
                error: "Wrong body. Body must contain: location, donorEmail, type, description, capacity",
            });
        }
        const result = await offer.add(req);
        log(result);
        res.send(result);
    });

    router.get("/view", jwtCheck, async (req, res) => {
        log(`View offers: ${JSON.stringify(req.headers)}`);
        if (!"donorEmail" in req.query) {
            req.status(400);
            res.send({
                error: "donorEmail not found in query params",
            });
        }
        const result = await offer.getByEmail(req);
        res.send(result);
    });

    app.use("/api/offer", router);
};
