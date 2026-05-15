# Modelo Lógico

- Turma 1:N Aluno
- Professor 1:N Disciplina
- Aluno N:N Disciplina resolvido por Matricula
- Matricula 1:1 Nota

Entidades normalizadas em 3FN:

- `turmas(id, nome, semestre, ano, created_at, updated_at)`
- `alunos(id, nome, cpf, data_nascimento, email, telefone, matricula, turma_id, created_at, updated_at)`
- `professores(id, nome, cpf, email, especialidade, ativo, created_at, updated_at)`
- `disciplinas(id, nome, carga_horaria, professor_id, created_at, updated_at)`
- `matriculas(id, aluno_id, disciplina_id, data_matricula)`
- `notas(id, matricula_id, nota1, nota2, nota3, media, situacao, created_at, updated_at)`
- `audit_logs(id, tabela, operacao, registro_id, detalhes, created_at)`
