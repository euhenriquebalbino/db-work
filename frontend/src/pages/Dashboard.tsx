import { Alert, Box, Button, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { api } from "../services/api";
import { Entity } from "../types/api";

type StudentsByClass = {
  turma_id: number;
  turma: string;
  quantidade: number;
};

type DashboardState = {
  studentsByClass: StudentsByClass[];
  disciplines: number;
  classes: number;
  schoolAverage: number | null;
};

export function Dashboard() {
  const [data, setData] = useState<DashboardState>({
    studentsByClass: [],
    disciplines: 0,
    classes: 0,
    schoolAverage: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const totalStudents = useMemo(
    () => data.studentsByClass.reduce((total, item) => total + Number(item.quantidade ?? 0), 0),
    [data.studentsByClass],
  );

  const cards = [
    { label: "Alunos ativos", value: totalStudents },
    { label: "Disciplinas", value: data.disciplines },
    { label: "Turmas", value: data.classes },
    { label: "Media geral", value: data.schoolAverage === null ? "0.0" : data.schoolAverage.toFixed(1) },
  ];

  async function loadDashboard() {
    setLoading(true);
    setError("");
    try {
      const [studentsByClassResponse, averageResponse, disciplinesResponse, classesResponse] = await Promise.all([
        api.get("/relatorios/quantidade-alunos-por-turma"),
        api.get("/relatorios/media-geral-escola"),
        api.get("/disciplinas", { params: { page: 1, pageSize: 1000 } }),
        api.get("/turmas", { params: { page: 1, pageSize: 1000 } }),
      ]);

      const studentsByClass = studentsByClassResponse.data.data.map((item: Entity) => ({
        turma_id: Number(item.turma_id),
        turma: String(item.turma),
        quantidade: Number(item.quantidade ?? 0),
      }));
      const averageValue = averageResponse.data.data[0]?.media_geral_escola;

      setData({
        studentsByClass,
        disciplines: disciplinesResponse.data.data.length,
        classes: classesResponse.data.data.length,
        schoolAverage: averageValue === null || averageValue === undefined ? null : Number(averageValue),
      });
    } catch (requestError) {
      setError(String(requestError));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadDashboard();
  }, []);

  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" spacing={2}>
        <Typography variant="h4">Dashboard Academico</Typography>
        <Button startIcon={<Refresh />} variant="contained" onClick={loadDashboard} disabled={loading}>
          Atualizar
        </Button>
      </Stack>
      {error && <Alert severity="error">{error}</Alert>}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
          gap: 2,
        }}
      >
        {cards.map((card) => (
          <Paper key={card.label} sx={{ p: 2, bgcolor: 'background.default' }}>
            <Typography color="text.secondary">{card.label}</Typography>
            <Typography variant="h4">{loading ? <CircularProgress size={28} /> : card.value}</Typography>
          </Paper>
        ))}
      </Box>
      <Paper sx={{ p: 2, height: 360, bgcolor: 'background.default' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Alunos por turma
        </Typography>
        {loading ? (
          <Box sx={{ display: "grid", height: "80%", placeItems: "center" }}>
            <CircularProgress />
          </Box>
        ) : data.studentsByClass.length === 0 ? (
          <Box sx={{ display: "grid", height: "80%", placeItems: "center" }}>
            <Typography color="text.secondary">Nenhuma turma cadastrada.</Typography>
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={data.studentsByClass}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="turma" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="quantidade" fill="#246BFE" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Paper>
    </Stack>
  );
}
