import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import usersRoutes from './routes/users.js';
import exercisesRoutes from './routes/exercises.js';
import workoutsRoutes from './routes/workouts.js';
import groupWorkoutsRoutes from './routes/group-workouts.js';
import challengesRoutes from './routes/challenges.js';
import coachingRoutes from './routes/coaching.js';
import feedRoutes from './routes/feed.js';
import statisticsRoutes from './routes/statistics.js';
import badgesRoutes from './routes/badges.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/users', usersRoutes);
app.use('/exercises', exercisesRoutes);
app.use('/workouts', workoutsRoutes);
app.use('/group-workouts', groupWorkoutsRoutes);
app.use('/challenges', challengesRoutes);
app.use('/coaching', coachingRoutes);
app.use('/feed', feedRoutes);
app.use('/statistics', statisticsRoutes);
app.use('/badges', badgesRoutes);

// 404
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

