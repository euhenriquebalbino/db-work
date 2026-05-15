# Modelo Físico

O modelo físico está implementado em:

- `database/tables/001_schema.sql`
- `database/views/001_views.sql`
- `database/triggers/001_triggers.sql`
- `database/procedures/001_crud_procedures.sql`
- `database/procedures/002_report_procedures.sql`

Principais recursos físicos:

- Chaves primárias `IDENTITY`
- Chaves estrangeiras entre turmas, alunos, professores, disciplinas, matrículas e notas
- `UNIQUE` para CPF, matrícula e vínculos aluno-disciplina
- `CHECK` para ano, carga horária e intervalo de notas
- Índices para busca, joins e ranking por média
- Triggers para consistência e auditoria
