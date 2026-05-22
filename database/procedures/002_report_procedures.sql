USE SchoolGrades;
GO

CREATE OR ALTER PROCEDURE dbo.sp_rel_media_por_aluno_disciplina
AS
SELECT *
FROM dbo.vw_media_alunos
ORDER BY aluno, disciplina;
GO
CREATE OR ALTER PROCEDURE dbo.sp_rel_notas_turma_disciplina
  @turma_id INT,
  @disciplina_id INT
AS
SELECT *
FROM dbo.vw_notas_por_turma
WHERE turma_id=@turma_id AND disciplina_id=@disciplina_id
ORDER BY aluno;
GO
CREATE OR ALTER PROCEDURE dbo.sp_rel_alunos_por_turma
  @turma_id INT
AS
SELECT a.*, t.nome AS turma
FROM dbo.alunos a JOIN dbo.turmas t ON t.id=a.turma_id
WHERE t.id=@turma_id
ORDER BY a.nome;
GO
CREATE OR ALTER PROCEDURE dbo.sp_rel_alunos_aprovados
AS
SELECT *
FROM dbo.vw_alunos_aprovados
ORDER BY aluno;
GO
CREATE OR ALTER PROCEDURE dbo.sp_rel_alunos_reprovados
AS
SELECT *
FROM dbo.vw_alunos_reprovados
ORDER BY aluno;
GO
CREATE OR ALTER PROCEDURE dbo.sp_rel_disciplinas_por_professor
  @professor_id INT
AS
SELECT d.*, p.nome AS professor
FROM dbo.disciplinas d JOIN dbo.professores p ON p.id=d.professor_id
WHERE p.id=@professor_id
ORDER BY d.nome;
GO
CREATE OR ALTER PROCEDURE dbo.sp_rel_ranking_melhores_medias
AS
SELECT aluno_id, aluno, AVG(media) AS media_geral
FROM dbo.vw_media_alunos
GROUP BY aluno_id, aluno
ORDER BY media_geral DESC;
GO
CREATE OR ALTER PROCEDURE dbo.sp_rel_quantidade_alunos_por_turma
AS
SELECT t.id AS turma_id, t.nome AS turma, COUNT(a.id) AS quantidade
FROM dbo.turmas t LEFT JOIN dbo.alunos a ON a.turma_id=t.id
GROUP BY t.id, t.nome
ORDER BY t.nome;
GO
CREATE OR ALTER PROCEDURE dbo.sp_rel_media_geral_escola
AS
SELECT AVG(media) AS media_geral_escola
FROM dbo.notas;
GO
CREATE OR ALTER PROCEDURE dbo.sp_rel_historico_escolar_aluno
  @aluno_id INT
AS
SELECT *
FROM dbo.vw_historico_escolar
WHERE aluno_id=@aluno_id
ORDER BY disciplina;
GO
