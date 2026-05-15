# Documentação da API

Base URL: `http://localhost:3000/api`

Todos os endpoints retornam:

```json
{ "success": true, "data": [] }
```

## CRUD

- `GET /alunos?search=&page=1&pageSize=10`
- `POST /alunos`
- `GET /alunos/:id`
- `PATCH /alunos/:id`
- `DELETE /alunos/:id`

O mesmo padrão existe para:

- `/professores`
- `/disciplinas`
- `/turmas`
- `/matriculas`
- `/notas`

## Consultas de notas

- `GET /notas/aluno/:alunoId`
- `GET /notas/turma/:turmaId`

## Relatórios

- `GET /relatorios/media-por-aluno-disciplina`
- `GET /relatorios/notas-turma-disciplina?turmaId=1&disciplinaId=1`
- `GET /relatorios/alunos-por-turma/:turmaId`
- `GET /relatorios/aprovados`
- `GET /relatorios/reprovados`
- `GET /relatorios/disciplinas-por-professor/:professorId`
- `GET /relatorios/ranking`
- `GET /relatorios/quantidade-alunos-por-turma`
- `GET /relatorios/media-geral-escola`
- `GET /relatorios/historico/:alunoId`

Swagger disponível em `/api/docs`.
