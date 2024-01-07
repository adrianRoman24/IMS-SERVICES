const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const { log, isUserRegistered } = require("../utils/utils");

const app = express();
const SERVER_PORT = 3000;

async function main() {
    // add middlewares
    app.engine('html', require('ejs').renderFile);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(express.static(path.join(__dirname, 'public')));

    // dummy page used to check if user is registered after login
    app.get("/views/dummy", (_, res) => {
        res.sendFile(path.join(__dirname, "views/dummy.html"));
    });

    // added as login callback
    app.get("/views/homepage", async (req, res) => {
        log(`Homepage: ${JSON.stringify(req.query)}`);
        if ("email" in req.query) {
            // check if email is registered

            const isRegistered = await isUserRegistered(req);
            if (isRegistered === true) {
                log("User registered");
                res.sendFile(path.join(__dirname, "views/homepage.html"));
            } else {
                log("User not registered")
                res.sendFile(path.join(__dirname, "views/signup.html"));
            }
        } else {
            res.sendFile(path.join(__dirname, "views/homepage.html"));
        }
    });

    // added as login callback
    app.get("/views/donor/homepage", (_, res) => {
        res.sendFile(path.join(__dirname, "views/donor_homepage.html"));
    });

    app.get("/views/donor/profile", (_, res) => {
        res.sendFile(path.join(__dirname, "views/donor_profile.html"));
    });

    // added as login callback
    app.get("/views/refugee/homepage", (req, res) => {
        console.log(req.query)
        res.sendFile(path.join(__dirname, "views/refugee_homepage.html"));
    });

    app.get("/views/refugee/profile", (_, res) => {
        res.sendFile(path.join(__dirname, "views/refugee_profile.html"));
    });

    app.get("/views/login", (_, res) => {
        res.sendFile(path.join(__dirname, "views/login.html"));
    });

    // added as login callback
    app.get("/views/signup", (_, res) => {
        res.sendFile(path.join(__dirname, "views/signup.html"));
    });

    app.get("/views/offer/create", (_, res) => {
        res.sendFile(path.join(__dirname, "views/makeOffer.html"));
    });

    app.get("/views/offer/view", (_, res) => {
        res.sendFile(path.join(__dirname, "views/view_offers.html"));
    });

    app.get("/views/offer/my_offers", (_, res) => {
        res.sendFile(path.join(__dirname, "views/my_offers.html"));
    });

    app.get("/views/request/view", (_, res) => {
        res.sendFile(path.join(__dirname, "views/view_requests.html"));
    });
    
    app.get("/views/request/create", (_, res) => {
        res.sendFile(path.join(__dirname, "views/makeRequest.html"));
    });
    
    app.get("/views/request/my_requests", (_, res) => {
        res.sendFile(path.join(__dirname, "views/my_requests.html"));
    });
    
    app.get("/views/history", (_, res) => {
        res.sendFile(path.join(__dirname, "views/history.html"));
    });
  
    app.get("/", (_, res) => {
        res.redirect(`http://localhost:${SERVER_PORT}/views/homepage`);
    });

    app.listen(SERVER_PORT, () => {
        log(`Listening on port ${SERVER_PORT}`);
    });
}

main();
