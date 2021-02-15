const router = require("express").Router();
const Workout = require("../models/workout");


router.post("/api/workouts/", ({ body }, res) => {
    //This will create a workout based on the scheema
    Workout.create(body)
    
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        res.json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate(
        { _id: req.params.id },
        
        {
            $push: {
                exercises: req.body
            },
           
        }
        )
        .then(result => {
            console.log(result);
            res.json(result);
        })
        
        .catch(err => {
            res.json(err);
        });
        
    });
    
    
    // router.get("/api/workouts/", (req, res) => {
    //     Workout.find({})
        
    //     .then(result => {
    //         console.log(result);
    //         res.json(result);
    //     })
        
    //     .catch(err => {
    //         res.json(err);
    //     });
        
    // });
    
    // router.get("/api/workouts/range", (req, res) => {

    //     Workout.find({})
    //     .limit(7)
    
    //     .then(result => {
    //         console.log(result);
    //         res.json(result);
    //     })
        
    //     .catch(err => {
    //         res.json(err);
    //     })

    // });



    module.exports = router;