import { PictureAsPdf, Refresh } from "@mui/icons-material";
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import jsPDF from "jspdf";
import { useState } from "react";
import { api } from "../services/api";
import { Entity } from "../types/api";

export function RelatoriosPage() {
  const [rows, setRows] = useState<Entity[]>([]);
  async function load() {
    const { data } = await api.get("/relatorios/ranking");
    setRows(data.data);
  }
  function exportPdf() {
    const doc = new jsPDF();
    doc.text("Ranking de melhores medias", 16, 16);
    rows.forEach((row, index) =>
      doc.text(
        `${index + 1}. ${row.aluno} - ${row.media_geral}`,
        16,
        28 + index * 8,
      ),
    );
    doc.save("ranking-medias.pdf");
  }
  return (
    <Stack spacing={2}>
      <Typography variant="h4">Relatorios Academicos</Typography>
      <Stack direction="row" spacing={1}>
        <Button startIcon={<Refresh />} variant="contained" onClick={load}>
          Atualizar ranking
        </Button>
        <Button startIcon={<PictureAsPdf />} onClick={exportPdf}>
          Exportar PDF
        </Button>
      </Stack>
      <Paper sx={{ bgcolor: "background.default" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Aluno</TableCell>
              <TableCell>Media geral</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={String(row.aluno_id)}>
                <TableCell>{row.aluno}</TableCell>
                <TableCell>{String(row.media_geral)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Stack>
  );
}
