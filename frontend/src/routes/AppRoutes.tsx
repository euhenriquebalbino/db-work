import { Route, Routes } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { Dashboard } from "../pages/Dashboard";
import {
  AlunosPage,
  DisciplinasPage,
  MatriculasPage,
  NotasPage,
  ProfessoresPage,
  TurmasPage,
} from "../pages/CrudPages";
import { RelatoriosPage } from "../pages/RelatoriosPage";

export function AppRoutes() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/alunos" element={<AlunosPage />} />
        <Route path="/professores" element={<ProfessoresPage />} />
        <Route path="/disciplinas" element={<DisciplinasPage />} />
        <Route path="/turmas" element={<TurmasPage />} />
        <Route path="/matriculas" element={<MatriculasPage />} />
        <Route path="/notas" element={<NotasPage />} />
        <Route path="/relatorios" element={<RelatoriosPage />} />
      </Routes>
    </AppLayout>
  );
}
