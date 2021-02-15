const router = require("express").Router();
const Workout = require("../models/workout");

//Create New Workout. Post Route
router.post("/api/workouts/", async ({ body }, res) => {
    //This will create a workout based on the scheema
    const workoutDay = await Workout.create({ body })
    res.json(workoutDay);

    // Workout.create(body)

    // .then(result => {
    //     res.json(result);
    // })
    // .catch(err => {
    //     res.json(err);
    // });
});

//Add Exercises to the workout. Put Route

router.put("/api/workouts/:id", async (req, res) => {
    const addExercises = await Workout.updateOne({ _id: req.params.id }, { $push: { exercises: req.body } })

    res.json(addExercises);



    // Workout.findOneAndUpdate(
    //     { _id: req.params.id },

    //     {
    //         $push: {
    //             exercises: req.body
    //         },

    //     }
    // )
    //     .then(result => {
    //         console.log(result);
    //         res.json(result);
    //     })

    //     .catch(err => {
    //         res.json(err);
    //     });

});

//Find Workout of 7 days and send it to range
//I need to aggregate a totalDuration 
router.get("/api/workouts/range", async (req, res) => {
    const weekRange =  await Workout.aggregate()
    //Need to understans the aggregate
    // .sort({ day: -1 })
    .limit(7)
    .addFields({ totalDuration: { $sum: "$exercises.duration" } })

    res.json(weekRange);

    // Workout.find({})
    //     .limit(7)

    //     .then(result => {
    //         console.log(result);
    //         res.json(result);
    //     })

    //     .catch(err => {
    //         res.json(err);
    //     })

});

//Find all workouts
router.get("/api/workouts/", async (req, res) => {
    const allWorkouts = await Workout.aggregate()
    //Need to understand this!!!!!!!!!!!
    .addFields({ totalDuration: { $sum: "$exercises.duration" } })
    res.json(allWorkouts);

        // .then(result => {
        //     console.log(result);
        //     res.json(result);
        // })

        // .catch(err => {
        //     res.json(err);
        // });

});



module.exports = router;