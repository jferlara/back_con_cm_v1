import { pool } from "../db.js";
import https from "https"; // Cambiado de http a https para manejar URLs https

export const getEvoluciones = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM evoluciones");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getEvolucion = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      "SELECT evoluciones.*,firmas.url FROM evoluciones LEFT JOIN firmas on evoluciones.id=firmas.message WHERE documento = ?",
      [id]
    );

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Evolucion not found" });
    }

    res.json(rows); // Devuelve todos los registros en 'rows'
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteEvoluciones = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM evoluciones WHERE id = ?", [
      id,
    ]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Evolucion not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createEvolucion = async (req, res) => {
  try {
    const {
      documento,
      nombre,
      sesion,
      procedimiento,
      evolucion,
      firma,
      odontograma,
      consentimiento_uno,
      consentimiento_dos,
      consentimiento_tres,
      consentimiento_cuatro,
      anestesia,
      codigo_diagnostico,
      codigo_procedimiento,
      valor,
      medio_pago,
      fecha,
      hora,
      fecha_registro,
    } = req.body;
    const [result] = await pool.query(
      "INSERT INTO evoluciones (documento, nombre, sesion, procedimiento, evolucion,firma, odontograma, consentimiento_uno,consentimiento_dos,consentimiento_tres,consentimiento_cuatro,anestesia,codigo_diagnostico,codigo_procedimiento,valor,medio_pago,fecha,hora,fecha_registro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?, ?, ?, ?, ?, ?, ?, ?)",
      [
        documento,
        nombre,
        sesion,
        procedimiento,
        evolucion,
        firma,
        odontograma,
        consentimiento_uno,
        consentimiento_dos,
        consentimiento_tres,
        consentimiento_cuatro,
        anestesia,
        codigo_diagnostico,
        codigo_procedimiento,
        valor,
        medio_pago,
        fecha,
        hora,
        fecha_registro,
      ]
    );

    res.status(201).json({
      id: result.insertId,
      documento,
      nombre,
      sesion,
      procedimiento,
      evolucion,
      firma,
      odontograma,
      consentimiento_uno,
      consentimiento_dos,
      consentimiento_tres,
      consentimiento_cuatro,
      anestesia,
      codigo_diagnostico,
      codigo_procedimiento,
      valor,
      medio_pago,
      fecha,
      hora,
      fecha_registro,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateEvolucion = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      documento,
      nombre,
      sesion,
      procedimiento,
      evolucion,
      firma,
      odontograma,
      consentimiento_uno,
      consentimiento_dos,
      consentimiento_tres,
      consentimiento_cuatro,
      anestesia,
      codigo_diagnostico,
      codigo_procedimiento,
      valor,
      medio_pago,
      fecha,
      hora,
      fecha_registro,
    } = req.body;

    const [result] = await pool.query(
      "UPDATE evoluciones SET documento = IFNULL(?, documento), nombre = IFNULL(?, nombre), sesion = IFNULL(?, sesion), procedimiento = IFNULL(?, procedimiento), evolucion = IFNULL(?, evolucion),firma = IFNULL(?, firma), odontograma = IFNULL(?, odontograma), consentimiento_uno = IFNULL(?, consentimiento_uno), consentimiento_dos = IFNULL(?, consentimiento_dos), consentimiento_tres = IFNULL(?, consentimiento_tres), consentimiento_cuatro = IFNULL(?, consentimiento_cuatro),  anestesia = IFNULL(?, anestesia), codigo_diagnostico = IFNULL(?, codigo_diagnostico),codigo_procedimiento = IFNULL(?, codigo_procedimiento),valor = IFNULL(?, valor),medio_pago = IFNULL(?, medio_pago),fecha = IFNULL(?, fecha), hora = IFNULL(?, hora), fecha_registro = IFNULL(?, fecha_registro)   WHERE id = ?",
      [
        documento,
        nombre,
        sesion,
        procedimiento,
        evolucion,
        firma,
        odontograma,
        consentimiento_uno,
        consentimiento_dos,
        consentimiento_tres,
        consentimiento_cuatro,
        anestesia,
        codigo_diagnostico,
        codigo_procedimiento,
        valor,
        medio_pago,
        fecha,
        hora,
        fecha_registro,
        id,
      ]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Historia not found" });

    const [rows] = await pool.query("SELECT * FROM evoluciones WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
