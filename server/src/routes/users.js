import { Router } from "express";
import User from "../models/User.js";
import Session from "../models/Session.js";
import { auth, admin } from "../middleware/auth.js";

const r = Router();

r.get("/", auth, async (req, res) =>
  res.json(
    await User.find({ active: true })
      .select("name email role active")
      .sort({ name: 1 })
  )
);

r.post("/", auth, admin, async (req, res) => {
  try {
    const { name, email, password = "ChangeMe123!" } = req.body;

    const bcrypt = (await import("bcryptjs")).default;

    const u = await User.create({
      name,
      email,
      passwordHash: await bcrypt.hash(password, 12),
      role: "member",
    });

    // Add the new friend to all upcoming sessions as PENDING
    await Session.updateMany(
      {
        date: { $gte: new Date() },
        "attendance.userId": { $ne: u._id },
      },
      {
        $push: {
          attendance: {
            userId: u._id,
            status: "PENDING",
          },
        },
      }
    );

    res.status(201).json({
      id: u._id,
      name: u.name,
      email: u.email,
      role: u.role,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
});

r.patch("/:id", auth, admin, async (req, res) =>
  res.json(
    await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .select("name email role active")
  )
);

export default r;