const Group = require('../models/Group');

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find({});
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.createGroup = async (req, res) => {
  const { name, description } = req.body;
  const createdBy = req.user.id;
  // Creating a new group instance
  const newGroup = new Group({
    name,
    description,
    createdBy,
  });

  try {
    const savedGroup = await newGroup.save();
    res.status(201).json(savedGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.searchGroups = async (req, res) => {
  try {
    const query = req.query.name;
    // Using a regular expression to enable case-insensitive and partial matching
    const regex = new RegExp(query, 'i'); // 'i' for case-insensitive

    const groups = await Group.find({ name: regex });
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
