import { pool } from "../db.js";
import https from "https"; // Cambiado de http a https para manejar URLs https

export const getOdontogramas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM odontograma_detalle");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getOdontograma = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      "SELECT message, documento, public_id, fecha, id FROM odontograma_detalle WHERE public_id = ? ORDER BY id DESC LIMIT 1",
      [id]
    );

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Odontograma detalle not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteOdontogramas = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      "DELETE FROM odontograma_detalle WHERE id = ?",
      [id]
    );

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Odontograma detalle not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createOdontograma = async (req, res) => {
  try {
    const {
      message,
      documento,
      public_id,
      fecha,
      num_11,
      num_12,
      num_13,
      num_14,
      num_15,
      num_16,
      num_17,
      num_18,
      num_21,
      num_22,
      num_23,
      num_24,
      num_25,
      num_26,
      num_27,
      num_28,
      num_31,
      num_32,
      num_33,
      num_34,
      num_35,
      num_36,
      num_37,
      num_38,
      num_41,
      num_42,
      num_43,
      num_44,
      num_45,
      num_46,
      num_47,
      num_48,
    } = req.body;
    const [result] = await pool.query(
      "INSERT INTO odontograma_detalle (message, documento, public_id, fecha, num_11,num_12,num_13,num_14,num_15,num_16,num_17,num_18,num_21,num_22,num_23,num_24,num_25,num_26,num_27,num_28,num_31,num_32,num_33,num_34,num_35,num_36,num_37,num_38,num_41,num_42,num_43,num_44,num_45,num_46,num_47,num_48) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        message,
        documento,
        public_id,
        fecha,
        num_11,
        num_12,
        num_13,
        num_14,
        num_15,
        num_16,
        num_17,
        num_18,
        num_21,
        num_22,
        num_23,
        num_24,
        num_25,
        num_26,
        num_27,
        num_28,
        num_31,
        num_32,
        num_33,
        num_34,
        num_35,
        num_36,
        num_37,
        num_38,
        num_41,
        num_42,
        num_43,
        num_44,
        num_45,
        num_46,
        num_47,
        num_48,
      ]
    );

    res.status(201).json({
      id: result.insertId,
      message,
      documento,
      public_id,
      fecha,
      num_11,
      num_12,
      num_13,
      num_14,
      num_15,
      num_16,
      num_17,
      num_18,
      num_21,
      num_22,
      num_23,
      num_24,
      num_25,
      num_26,
      num_27,
      num_28,
      num_31,
      num_32,
      num_33,
      num_34,
      num_35,
      num_36,
      num_37,
      num_38,
      num_41,
      num_42,
      num_43,
      num_44,
      num_45,
      num_46,
      num_47,
      num_48,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateOdontograma = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      message,
      documento,
      public_id,
      fecha,
      num_11,
      num_12,
      num_13,
      num_14,
      num_15,
      num_16,
      num_17,
      num_18,
      num_21,
      num_22,
      num_23,
      num_24,
      num_25,
      num_26,
      num_27,
      num_28,
      num_31,
      num_32,
      num_33,
      num_34,
      num_35,
      num_36,
      num_37,
      num_38,
      num_41,
      num_42,
      num_43,
      num_44,
      num_45,
      num_46,
      num_47,
      num_48,
    } = req.body;

    const [result] = await pool.query(
      "UPDATE odontograma_detalle SET message = IFNULL(?, message), documento = IFNULL(?, documento), public_id = IFNULL(?, public_id), fecha = IFNULL(?, fecha), num_11 = IFNULL(?, num_11), num_12 = IFNULL(?, num_12), num_13 = IFNULL(?, num_13), num_14 = IFNULL(?, num_14), num_15 = IFNULL(?, num_15), num_16 = IFNULL(?, num_16), num_17 = IFNULL(?, num_17), num_18 = IFNULL(?, num_18),  num_19 = IFNULL(?, num_19), num_20 = IFNULL(?, num_20),num_21 = IFNULL(?, num_21), num_22 = IFNULL(?, num_22), num_23 = IFNULL(?, num_23),  num_24 = IFNULL(?, num_24), num_25 = IFNULL(?, num_25), num_26 = IFNULL(?, num_26), num_27 = IFNULL(?, num_27), num_28 = IFNULL(?, num_28), num_31 = IFNULL(?, num_31), num_32 = IFNULL(?, num_32), num_33 = IFNULL(?, num_33), num_34 = IFNULL(?, num_34), num_35 = IFNULL(?, num_35), num_36 = IFNULL(?, num_36), num_37 = IFNULL(?, num_37), num_38 = IFNULL(?, num_38), num_41 = IFNULL(?, num_41), num_42 = IFNULL(?, num_42), num_43 = FNULL(?, num_43), num_44 = IFNULL(?, num_44), num_45 = IFNULL(?, num_45), num_46 = IFNULL(?, num_46), num_47 = IFNULL(?, num_47), num_48 = IFNULL(?, num_48) WHERE id = ?",
      [
        message,
        documento,
        public_id,
        fecha,
        num_11,
        num_12,
        num_13,
        num_14,
        num_15,
        num_16,
        num_17,
        num_18,
        num_21,
        num_22,
        num_23,
        num_24,
        num_25,
        num_26,
        num_27,
        num_28,
        num_31,
        num_32,
        num_33,
        num_34,
        num_35,
        num_36,
        num_37,
        num_38,
        num_41,
        num_42,
        num_43,
        num_44,
        num_45,
        num_46,
        num_47,
        num_48,
        id,
      ]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Odontograma detalle not found" });

    const [rows] = await pool.query(
      "SELECT * FROM odontograma_detalle WHERE id = ?",
      [id]
    );

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
