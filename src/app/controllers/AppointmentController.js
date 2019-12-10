import * as Yup from "yup";
import { startOfHour, parseISO, isBefore, format, subHours } from "date-fns";
import { ptBR } from "date-fns/locale";

import Appointment from "../models/Appointment";
import File from "../models/File";
import User from "../models/User";
import Notification from "../schemas/Notification";

import ConcellationMail from "../jobs/CancellationMail";

import Queue from "../../lib/Queue";

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ["date"],
      limit: 20,
      attributes: ["id", "date"],
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: "provider",
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

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required()
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: "Validations failed." });

    // Check if this user is a provider

    const { provider_id, date } = req.body;

    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true }
    });

    if (!isProvider)
      return res
        .status(401)
        .json({ error: "You can only create appointments with providers" });

    // Check if this date is avaliable

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date()))
      return res.status(400).json({ error: "Past date are not permited " });

    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart
      }
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: "Appointment date is not avaliable" });
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date: hourStart
    });

    // Notify appointment to provider;

    const user = await User.findByPk(req.userId);
    const formattedDate = format(
      hourStart,
      " 'dia' dd 'de' MMMM 'às' HH:mm'h' ",
      {
        locale: ptBR
      }
    );

    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}`,
      user: provider_id
    });

    await Queue.add();

    return res.json(appointment);
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "provider",
          attributes: ["id", "name", "email"]
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "name"]
        }
      ]
    });

    if (appointment.user_id !== req.userId)
      return res
        .status(401)
        .json({ error: "You don't have permisson to cancel this appointment" });

    const dateWithSub = subHours(appointment.date, 2);

    if (isBefore(dateWithSub, new Date()))
      return res.status(401).json({
        error: "You can only cancel appointments 2 hours in advance."
      });

    appointment.canceled_at = new Date();

    await appointment.save();

    await Queue.add(ConcellationMail.key, {
      appointment
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
