import { EntityPage } from "../components/EntityPage";

export const AlunosPage = () => (
  <EntityPage
    title="Alunos"
    resource="/alunos"
    columns={[
      { key: "id", label: "ID" },
      { key: "nome", label: "Nome" },
      { key: "cpf", label: "CPF" },
      { key: "matricula", label: "Matrícula" },
      { key: "turma_nome", label: "Turma" },
    ]}
    fields={[
      { name: "nome", label: "Nome", required: true },
      { name: "cpf", label: "CPF", required: true },
      {
        name: "data_nascimento",
        label: "Data de nascimento",
        type: "date",
        required: true,
      },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "telefone", label: "Telefone" },
      { name: "matricula", label: "Matricula", required: true },
      { name: "turma_id", label: "Turma ID", type: "number", required: true },
    ]}
  />
);

export const ProfessoresPage = () => (
  <EntityPage
    title="Professores"
    resource="/professores"
    columns={[
      { key: "id", label: "ID" },
      { key: "nome", label: "Nome" },
      { key: "cpf", label: "CPF" },
      { key: "email", label: "E-mail" },
      { key: "especialidade", label: "Especialidade" },
      { key: "ativo", label: "Ativo" },
    ]}
    fields={[
      { name: "nome", label: "Nome", required: true },
      { name: "cpf", label: "CPF", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "especialidade", label: "Especialidade", required: true },
      { name: "ativo", label: "Ativo", type: "boolean" },
    ]}
  />
);

export const TurmasPage = () => (
  <EntityPage
    title="Turmas"
    resource="/turmas"
    columns={[
      { key: "id", label: "ID" },
      { key: "nome", label: "Nome" },
      { key: "semestre", label: "Semestre" },
      { key: "ano", label: "Ano" },
    ]}
    fields={[
      { name: "nome", label: "Nome", required: true },
      { name: "semestre", label: "Semestre", required: true },
      { name: "ano", label: "Ano", type: "number", required: true },
    ]}
  />
);

export const DisciplinasPage = () => (
  <EntityPage
    title="Disciplinas"
    resource="/disciplinas"
    columns={[
      { key: "id", label: "ID" },
      { key: "nome", label: "Nome" },
      { key: "carga_horaria", label: "Carga Horária" },
      { key: "professor_nome", label: "Professor" },
    ]}
    fields={[
      { name: "nome", label: "Nome", required: true },
      {
        name: "carga_horaria",
        label: "Carga horaria",
        type: "number",
        required: true,
      },
      {
        name: "professor_id",
        label: "Professor ID",
        type: "number",
        required: true,
      },
    ]}
  />
);

export const MatriculasPage = () => (
  <EntityPage
    title="Matriculas"
    resource="/matriculas"
    columns={[
      { key: "id", label: "ID" },
      { key: "aluno_nome", label: "Aluno" },
      { key: "disciplina_nome", label: "Disciplina" },
      { key: "data_matricula", label: "Data da Matrícula" },
    ]}
    fields={[
      { name: "aluno_id", label: "Aluno ID", type: "number", required: true },
      {
        name: "disciplina_id",
        label: "Disciplina ID",
        type: "number",
        required: true,
      },
    ]}
  />
);

export const NotasPage = () => (
  <EntityPage
    title="Notas"
    resource="/notas"
    columns={[
      { key: "id", label: "ID" },
      { key: "aluno", label: "Aluno" },
      { key: "disciplina", label: "Disciplina" },
      { key: "nota1", label: "Nota 1" },
      { key: "nota2", label: "Nota 2" },
      { key: "nota3", label: "Nota 3" },
      { key: "media", label: "Média" },
      { key: "situacao", label: "Situação" },
    ]}
    fields={[
      {
        name: "matricula_id",
        label: "Matricula ID",
        type: "number",
        required: true,
      },
      { name: "nota1", label: "Nota 1", type: "number", required: true },
      { name: "nota2", label: "Nota 2", type: "number", required: true },
      { name: "nota3", label: "Nota 3", type: "number", required: true },
    ]}
  />
);
