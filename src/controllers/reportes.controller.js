import { pool } from "../db.js";
import https from "https"; // Cambiado de http a https para manejar URLs https

export const getPlanillas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT e.fecha_registro AS `fecha`, p.tipo_documento AS `tipo_doc`, p.documento, p.primer_apellido,p.segundo_apellido,p.primer_nombre,p.segundo_nombre, p.genero AS `sexo`, p.edad, e.codigo_diagnostico AS `DX`, e.codigo_procedimiento, valor AS `valor_procedimiento`, medio_pago AS `medio_de_pago`, e.hora AS `hora_de_atencion`, DAY(p.nacimiento) as dia_nac, MONTH(p.nacimiento) as mes_nac , YEAR(p.nacimiento) as anio_nac , p.nacionalidad, pais_residencia AS `pais_residencia` FROM pacientes p JOIN evoluciones e ON p.documento = e.documento");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getPlanilla = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT e.fecha_registro AS `fecha`, p.tipo_documento AS `tipo_doc`, p.documento, p.primer_apellido,p.segundo_apellido,p.primer_nombre,p.segundo_nombre, p.genero AS `sexo`, p.edad, e.codigo_diagnostico AS `DX`, e.codigo_procedimiento, valor AS `valor_procedimiento`, medio_pago AS `medio_de_pago`, e.hora AS `hora_de_atencion`, DAY(p.nacimiento) as dia_nac, MONTH(p.nacimiento) as mes_nac , YEAR(p.nacimiento) as anio_nac , p.nacionalidad, pais_residencia AS `pais_residencia` FROM pacientes p JOIN evoluciones e ON p.documento = e.documento WHERE documento = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Planilla not found" });
    }

    res.json(rows); // Devuelve todos los registros en 'rows'
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};


