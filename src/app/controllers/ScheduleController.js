import { Op } from "sequelize";
import { startOfDay, endOfDay, parseISO } from "date-fns";

import Appointment from "../models/Appointment";
import User from "../models/User";
import File from "../models/File";

class ScheduleController {
  async index(req, res) {
    const { date } = req.query;
    const parseDate = parseISO(date);

    const isProvider = await User.findOne({
      where: { id: req.userId, provider: true }
    });

    if (!isProvider)
      return res.status(401).json({ error: "User is not a provider." });

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)]
        }
      },
      order: ["date"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name"],
          include: [
            {
              model: File,
              as: "avatar",
              attributes: ["id", "path", "url"]
            }
          ]
        }
      ]
    });

    return res.json(appointments);
  }
}

export default new ScheduleController();
