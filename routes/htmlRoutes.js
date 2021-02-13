//Router()??
const router = require("express").Router();
const path = require("path");

router.get("/exercise", (req, res) =>{
    //__dirname Gives absolute path of the directory that contains the currently executing file.
    //res. sendFile() function basically transfers the file at the given path and it sets the Content-Type response HTTP header field based on the filename extension.
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

module.exports = router;