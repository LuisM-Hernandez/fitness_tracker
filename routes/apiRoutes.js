const router = require("express").Router();
const Workout = require("../models/workout");

//Create New Workout. Post Route
router.post("/api/workouts/", async ({ body }, res) => {
    //This will create a workout based on the scheema
    const workoutDay = await Workout.create({ body })
    res.json(workoutDay);
});

//Add Exercises to the workout. PUT Route
router.put("/api/workouts/:id", async (req, res) => {
    const addExercises = await Workout.updateOne({ _id: req.params.id }, { $push: { exercises: req.body } })

    res.json(addExercises);
});

//Find Workout of 7 days and send it to range
router.get("/api/workouts/range", async (req, res) => {
    //Need to understand Aggregate better
    const weekRange =  await Workout.aggregate()
    
    .sort({ day: 1 })
    .limit(7)
    .addFields({ totalDuration: { $sum: "$exercises.duration" } })

    res.json(weekRange);
});

//Find all workouts
router.get("/api/workouts/", async (req, res) => {
    const allWorkouts = await Workout.aggregate()
    .addFields({ totalDuration: { $sum: "$exercises.duration" } })
    res.json(allWorkouts);
});

module.exports = router;