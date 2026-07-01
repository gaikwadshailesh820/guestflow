const prisma = require("../lib/prisma");

async function getAllActivities() {
  return prisma.activity.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

async function getActivity(id) {
  return prisma.activity.findUnique({
    where: {
      id,
    },
  });
}

async function createActivity(data) {
  return prisma.activity.create({
    data: {
      title: data.title,
      description: data.description,
      type: data.type,
      createdById: data.createdById || null,
    },
  });
}

async function updateActivity(id, data) {
  const existing = await prisma.activity.findUnique({
    where: {
      id,
    },
  });

  if (!existing) return null;

  return prisma.activity.update({
    where: {
      id,
    },
    data: {
      title: data.title ?? existing.title,
      description: data.description ?? existing.description,
      type: data.type ?? existing.type,
    },
  });
}

async function deleteActivity(id) {
  const existing = await prisma.activity.findUnique({
    where: {
      id,
    },
  });

  if (!existing) return false;

  await prisma.activity.delete({
    where: {
      id,
    },
  });

  return true;
}

module.exports = {
  getAllActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
};