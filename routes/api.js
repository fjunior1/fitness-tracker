const router = require("express").Router();
const mongoose = require('mongoose');
const db = require('../models')
const path = require('path');

router.get("/api/workouts", (req, res) => {
  db.Workout.aggregate( [
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" } 
      }
    },
  ] ).sort({ day: 1 }).then(wkDb => {
      res.json(wkDb);
    }).catch(err => {
      res.status(400).json(err);
    });
});

router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/exercise.html'));
});

router.post("/api/workouts", ( req, res) => {
  db.Workout.create(req.body)
    .then(wkDb => {
      res.json(wkDb);
    }).catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", ( req, res) => {
  db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } })
    .then(wkDb => {
      res.json(wkDb);
    }).catch(err => {
      res.status(400).json(err);
    });
});

router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/stats.html'));
});

router.get("/api/workouts/range", (req, res) => {

  db.Workout.aggregate([
    {
      $addFields: { totalDuration: { $sum: "$exercises.duration" } }
    },
  ]).sort({ day: -1 }).then(workouts => {
    const lastSevenWorkouts = workouts.slice(0,7)
    res.json(lastSevenWorkouts);
  }).catch(err => {
    res.status(400).json(err);
  })
});

module.exports = router;
