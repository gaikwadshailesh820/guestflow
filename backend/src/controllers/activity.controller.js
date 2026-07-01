const activityService = require("../services/activity.service");
const { httpError } = require("../utils/asyncHandler");

exports.getActivities = async (req, res) => {
  const activities = await activityService.getAllActivities();
  res.json(activities);
};

exports.getActivity = async (req, res) => {
  const activity = await activityService.getActivity(req.params.id);

  if (!activity) {
    throw httpError(404, `Activity ${req.params.id} not found`);
  }

  res.json(activity);
};

exports.createActivity = async (req, res) => {
  const { title, description, type } = req.body;

  if (!title || !description || !type) {
    throw httpError(
      400,
      "title, description and type are required"
    );
  }

  const activity = await activityService.createActivity(req.body);

  res.status(201).json(activity);
};

exports.updateActivity = async (req, res) => {
  const activity = await activityService.updateActivity(
    req.params.id,
    req.body
  );

  if (!activity) {
    throw httpError(404, `Activity ${req.params.id} not found`);
  }

  res.json(activity);
};

exports.deleteActivity = async (req, res) => {
  const deleted = await activityService.deleteActivity(req.params.id);

  if (!deleted) {
    throw httpError(404, `Activity ${req.params.id} not found`);
  }

  res.sendStatus(204);
};