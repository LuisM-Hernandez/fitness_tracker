const router = require("express").Router();
const Workout = require("../models/workout");

//Get Route
//Aggregate function for get routes

// View the total duration of each workout from the past seven workouts on the stats page.

// Add exercises to the most recent workout plan.
router.post("/api/workouts/", ({ body }, res) => {
    //This will create a workout based on the scheema
    Workout.create(body)

        .then(result => {
            console.log(result);
            res.json(result);
        })

        .catch(err => {
            res.json(err);
        });
});

// Add new exercises to a new workout plan.
router.put("/api/workouts/:id", (req, res) => {
    Workout.findOneAndUpdate(
        { _id: req.params.id },
        
        {
            $push: {
                exercises: req.body
            },
            
            $inc: {
                totalduration : req.body.duration
            }
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
    
    // View the combined weight of multiple exercises from the past seven workouts on the stats page.
    
    router.get("/api/workouts/", (req, res) => {
        Workout.find({})
    
            .then(result => {
                console.log(result);
                res.json(result);
            })
    
            .catch(err => {
                res.json(err);
            });
    
    });
    
module.exports = router;