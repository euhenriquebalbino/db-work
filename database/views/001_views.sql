USE SchoolGrades;
GO

CREATE OR ALTER VIEW dbo.vw_media_alunos AS
SELECT a.id AS aluno_id, a.nome AS aluno, d.id AS disciplina_id, d.nome AS disciplina,
       n.nota1, n.nota2, n.nota3, n.media, n.situacao
FROM dbo.notas n
JOIN dbo.matriculas m ON m.id = n.matricula_id
JOIN dbo.alunos a ON a.id = m.aluno_id
JOIN dbo.disciplinas d ON d.id = m.disciplina_id;
GO

CREATE OR ALTER VIEW dbo.vw_alunos_aprovados AS
SELECT * FROM dbo.vw_media_alunos WHERE situacao = 'APROVADO';
GO

CREATE OR ALTER VIEW dbo.vw_alunos_reprovados AS
SELECT * FROM dbo.vw_media_alunos WHERE situacao = 'REPROVADO';
GO

CREATE OR ALTER VIEW dbo.vw_notas_por_turma AS
SELECT t.id AS turma_id, t.nome AS turma, a.id AS aluno_id, a.nome AS aluno,
       d.id AS disciplina_id, d.nome AS disciplina, n.nota1, n.nota2, n.nota3, n.media, n.situacao
FROM dbo.notas n
JOIN dbo.matriculas m ON m.id = n.matricula_id
JOIN dbo.alunos a ON a.id = m.aluno_id
JOIN dbo.turmas t ON t.id = a.turma_id
JOIN dbo.disciplinas d ON d.id = m.disciplina_id;
GO

CREATE OR ALTER VIEW dbo.vw_historico_escolar AS
SELECT a.id AS aluno_id, a.nome AS aluno, a.matricula, t.nome AS turma,
       d.nome AS disciplina, p.nome AS professor, n.media, n.situacao, m.data_matricula
FROM dbo.alunos a
JOIN dbo.turmas t ON t.id = a.turma_id
JOIN dbo.matriculas m ON m.aluno_id = a.id
JOIN dbo.disciplinas d ON d.id = m.disciplina_id
JOIN dbo.professores p ON p.id = d.professor_id
LEFT JOIN dbo.notas n ON n.matricula_id = m.id;
GO
