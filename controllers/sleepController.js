const mongoose = require("mongoose");
const Record = require("../models/Record");
const User = require("../models/User");
const { z } = require("zod");

exports.newRecord = async (req, res) => {
  try {
    const { userId, hours, timestamp } = req.body;
    const schema = z.object({
      userId: z.string(),
      hours: z.number(),
      timestamp: z.string().optional(),
    });
    const resp = schema.safeParse({ userId, hours, timestamp });
    if (!resp.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid Inputs",
        error: resp.error,
      });
    }
    const newRecord = await Record.create({
      user: userId,
      hours,
      timestamp,
    });
    await User.findByIdAndUpdate(
      { _id: userId },
      {
        $push: {
          records: newRecord._id,
        },
      },
      { new: true }
    );
    return res.status(201).json({
      success: true,
      message: "Record added successfully",
      newRecord: newRecord,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getRecords = async (req, res) => {
  const userId = req.params.userId;
  try {
    const sleepRecords = await Record.find({ user: userId }).sort({
      timestamp: -1,
    });
    return res.status(201).json({
      success: true,
      message: "Records fetched successfully",
      sleepRecords: sleepRecords,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error retrieving sleep records", error });
  }
};

exports.deleteRecord = async (req, res) => {
  const recordId = req.params.recordId;
  try {
    const record = await Record.findByIdAndDelete(recordId);
    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }
    await User.findByIdAndUpdate(
      { _id: record.user },
      {
        $pull: {
          records: recordId,
        },
      },
      { new: true }
    );
    return res.status(201).json({
      success: true,
      message: "Record deleted successfully",
      record: record,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error deleting record",
    });
  }
};
