USE SchoolGrades;
GO

CREATE OR ALTER PROCEDURE dbo.sp_alunos_create
  @nome NVARCHAR(120),
  @cpf VARCHAR(14),
  @data_nascimento DATE,
  @email NVARCHAR(160),
  @telefone NVARCHAR(30) = NULL,
  @matricula NVARCHAR(30),
  @turma_id INT
AS
BEGIN
  SET NOCOUNT ON;
  INSERT INTO dbo.alunos
    (nome, cpf, data_nascimento, email, telefone, matricula, turma_id)
  VALUES
    (@nome, @cpf, @data_nascimento, @email, @telefone, @matricula, @turma_id);
  SELECT *
  FROM dbo.alunos
  WHERE id = SCOPE_IDENTITY();
END;
GO

CREATE OR ALTER PROCEDURE dbo.sp_alunos_list
  @search NVARCHAR(120) = '',
  @page INT = 1,
  @pageSize INT = 10
AS
BEGIN
  SELECT a.*, t.nome AS turma_nome, COUNT(*) OVER() AS total
  FROM dbo.alunos a JOIN dbo.turmas t ON t.id = a.turma_id
  WHERE @search = '' OR a.nome LIKE '%' + @search + '%' OR a.cpf LIKE '%' + @search + '%' OR a.matricula LIKE '%' + @search + '%'
  ORDER BY a.nome OFFSET (@page - 1) * @pageSize ROWS FETCH NEXT @pageSize ROWS ONLY;
END;
GO
CREATE OR ALTER PROCEDURE dbo.sp_alunos_get_by_id
  @id INT
AS
SELECT *
FROM dbo.alunos
WHERE id = @id;
GO
CREATE OR ALTER PROCEDURE dbo.sp_alunos_update
  @id INT,
  @nome NVARCHAR(120),
  @cpf VARCHAR(14),
  @data_nascimento DATE,
  @email NVARCHAR(160),
  @telefone NVARCHAR(30) = NULL,
  @matricula NVARCHAR(30),
  @turma_id INT
AS
BEGIN
  UPDATE dbo.alunos SET nome=@nome, cpf=@cpf, data_nascimento=@data_nascimento, email=@email, telefone=@telefone,
    matricula=@matricula, turma_id=@turma_id, updated_at=SYSUTCDATETIME() WHERE id=@id;
  SELECT *
  FROM dbo.alunos
  WHERE id=@id;
END;
GO
CREATE OR ALTER PROCEDURE dbo.sp_alunos_delete
  @id INT
AS
BEGIN
  DELETE FROM dbo.alunos WHERE id=@id;
  SELECT @id AS id;
END;
GO

CREATE OR ALTER PROCEDURE dbo.sp_professores_create
  @nome NVARCHAR(120),
  @cpf VARCHAR(14),
  @email NVARCHAR(160),
  @especialidade NVARCHAR(120),
  @ativo BIT = 1
AS
BEGIN
  INSERT INTO dbo.professores
    (nome, cpf, email, especialidade, ativo)
  VALUES
    (@nome, @cpf, @email, @especialidade, @ativo);
  SELECT *
  FROM dbo.professores
  WHERE id = SCOPE_IDENTITY();
END;
GO
CREATE OR ALTER PROCEDURE dbo.sp_professores_list
  @search NVARCHAR(120) = '',
  @page INT = 1,
  @pageSize INT = 10
AS
BEGIN
  SELECT *, COUNT(*) OVER() AS total
  FROM dbo.professores
  WHERE @search = '' OR nome LIKE '%' + @search + '%' OR cpf LIKE '%' + @search + '%' OR especialidade LIKE '%' + @search + '%'
  ORDER BY nome OFFSET (@page - 1) * @pageSize ROWS FETCH NEXT @pageSize ROWS ONLY;
END;
GO
CREATE OR ALTER PROCEDURE dbo.sp_professores_get_by_id
  @id INT
AS
SELECT *
FROM dbo.professores
WHERE id=@id;
GO
CREATE OR ALTER PROCEDURE dbo.sp_professores_update
  @id INT,
  @nome NVARCHAR(120),
  @cpf VARCHAR(14),
  @email NVARCHAR(160),
  @especialidade NVARCHAR(120),
  @ativo BIT = 1
AS
BEGIN
  UPDATE dbo.professores SET nome=@nome, cpf=@cpf, email=@email, especialidade=@especialidade, ativo=@ativo, updated_at=SYSUTCDATETIME() WHERE id=@id;
  SELECT *
  FROM dbo.professores
  WHERE id=@id;
END;
GO
CREATE OR ALTER PROCEDURE dbo.sp_professores_delete
  @id INT
AS
BEGIN
  DELETE FROM dbo.professores WHERE id=@id;
  SELECT @id AS id;
END;
GO

CREATE OR ALTER PROCEDURE dbo.sp_turmas_create
  @nome NVARCHAR(80),
  @semestre NVARCHAR(20),
  @ano INT
AS
BEGIN
  INSERT INTO dbo.turmas
    (nome, semestre, ano)
  VALUES
    (@nome, @semestre, @ano);
  SELECT *
  FROM dbo.turmas
  WHERE id=SCOPE_IDENTITY();
END;
GO
CREATE OR ALTER PROCEDURE dbo.sp_turmas_list
  @search NVARCHAR(120) = '',
  @page INT = 1,
  @pageSize INT = 10
AS
BEGIN
  SELECT *, COUNT(*) OVER() AS total
  FROM dbo.turmas
  WHERE @search = '' OR nome LIKE '%' + @search + '%' OR semestre LIKE '%' + @search + '%'
  ORDER BY ano DESC, nome OFFSET (@page - 1) * @pageSize ROWS FETCH NEXT @pageSize ROWS ONLY;
END;
GO
CREATE OR ALTER PROCEDURE dbo.sp_turmas_get_by_id
  @id INT
AS
SELECT *
FROM dbo.turmas
WHERE id=@id;
GO
CREATE OR ALTER PROCEDURE dbo.sp_turmas_update
  @id INT,
  @nome NVARCHAR(80),
  @semestre NVARCHAR(20),
  @ano INT
AS
BEGIN
  UPDATE dbo.turmas SET nome=@nome, semestre=@semestre, ano=@ano, updated_at=SYSUTCDATETIME() WHERE id=@id;
  SELECT *
  FROM dbo.turmas
  WHERE id=@id;
END;
GO
CREATE OR ALTER PROCEDURE dbo.sp_turmas_delete
  @id INT
AS
BEGIN
  IF EXISTS (SELECT 1
  FROM dbo.alunos
  WHERE turma_id=@id) THROW 50001, 'Nao e permitido excluir turma com alunos vinculados.', 1;
  DELETE FROM dbo.turmas WHERE id=@id;
  SELECT @id AS id;
END;
GO

CREATE OR ALTER PROCEDURE dbo.sp_disciplinas_create
  @nome NVARCHAR(120),
  @carga_horaria INT,
  @professor_id INT
AS
BEGIN
  INSERT INTO dbo.disciplinas
    (nome, carga_horaria, professor_id)
  VALUES
    (@nome, @carga_horaria, @professor_id);
  SELECT *
  FROM dbo.disciplinas
  WHERE id=SCOPE_IDENTITY();
END;
GO
CREATE OR ALTER PROCEDURE dbo.sp_disciplinas_list
  @search NVARCHAR(120) = '',
  @page INT = 1,
  @pageSize INT = 10
AS
BEGIN
  SELECT d.*, p.nome AS professor_nome, COUNT(*) OVER() AS total
  FROM dbo.disciplinas d JOIN dbo.professores p ON p.id=d.professor_id
  WHERE @search = '' OR d.nome LIKE '%' + @search + '%' OR p.nome LIKE '%' + @search + '%'
  ORDER BY d.nome OFFSET (@page - 1) * @pageSize ROWS FETCH NEXT @pageSize ROWS ONLY;
END;
GO
CREATE OR ALTER PROCEDURE dbo.sp_disciplinas_get_by_id
  @id INT
AS
SELECT *
FROM dbo.disciplinas
WHERE id=@id;
GO
CREATE OR ALTER PROCEDURE dbo.sp_disciplinas_update
  @id INT,
  @nome NVARCHAR(120),
  @carga_horaria INT,
  @professor_id INT
AS
BEGIN
  UPDATE dbo.disciplinas SET nome=@nome, carga_horaria=@carga_horaria, professor_id=@professor_id, updated_at=SYSUTCDATETIME() WHERE id=@id;
  SELECT *
  FROM dbo.disciplinas
  WHERE id=@id;
END;
GO
CREATE OR ALTER PROCEDURE dbo.sp_disciplinas_delete
  @id INT
AS
BEGIN
  IF EXISTS (SELECT 1
  FROM dbo.matriculas m JOIN dbo.notas n ON n.matricula_id=m.id
  WHERE m.disciplina_id=@id) THROW 50002, 'Nao e permitido excluir disciplina com notas lancadas.', 1;
  DELETE FROM dbo.disciplinas WHERE id=@id;
  SELECT @id AS id;
END;
GO

CREATE OR ALTER PROCEDURE dbo.sp_matriculas_create
  @aluno_id INT,
  @disciplina_id INT
AS
BEGIN
  INSERT INTO dbo.matriculas
    (aluno_id, disciplina_id)
  VALUES
    (@aluno_id, @disciplina_id);
  SELECT *
  FROM dbo.matriculas
  WHERE id=SCOPE_IDENTITY();
END;
GO
CREATE OR ALTER PROCEDURE dbo.sp_matriculas_list
  @search NVARCHAR(120) = '',
  @page INT = 1,
  @pageSize INT = 10
AS
BEGIN
  SELECT m.*, a.nome AS aluno_nome, d.nome AS disciplina_nome, COUNT(*) OVER() AS total
  FROM dbo.matriculas m JOIN dbo.alunos a ON a.id=m.aluno_id JOIN dbo.disciplinas d ON d.id=m.disciplina_id
  WHERE @search = '' OR a.nome LIKE '%' + @search + '%' OR d.nome LIKE '%' + @search + '%'
  ORDER BY m.data_matricula DESC OFFSET (@page - 1) * @pageSize ROWS FETCH NEXT @pageSize ROWS ONLY;
END;
GO
CREATE OR ALTER PROCEDURE dbo.sp_matriculas_get_by_id
  @id INT
AS
SELECT *
FROM dbo.matriculas
WHERE id=@id;
GO
CREATE OR ALTER PROCEDURE dbo.sp_matriculas_update
  @id INT,
  @aluno_id INT,
  @disciplina_id INT
AS
BEGIN
  UPDATE dbo.matriculas SET aluno_id=@aluno_id, disciplina_id=@disciplina_id WHERE id=@id;
  SELECT *
  FROM dbo.matriculas
  WHERE id=@id;
END;
GO
CREATE OR ALTER PROCEDURE dbo.sp_matriculas_delete
  @id INT
AS
BEGIN
  DELETE FROM dbo.matriculas WHERE id=@id;
  SELECT @id AS id;
END;
GO

CREATE OR ALTER PROCEDURE dbo.sp_notas_create
  @matricula_id INT,
  @nota1 DECIMAL(5,2),
  @nota2 DECIMAL(5,2),
  @nota3 DECIMAL(5,2)
AS
BEGIN
  INSERT INTO dbo.notas
    (matricula_id, nota1, nota2, nota3)
  VALUES
    (@matricula_id, @nota1, @nota2, @nota3);
  SELECT *
  FROM dbo.notas
  WHERE id=SCOPE_IDENTITY();
END;
GO
CREATE OR ALTER PROCEDURE dbo.sp_notas_list
  @search NVARCHAR(120) = '',
  @page INT = 1,
  @pageSize INT = 10
AS
BEGIN
  SELECT v.*, n.id, COUNT(*) OVER() AS total
  FROM dbo.notas n JOIN dbo.vw_media_alunos v ON v.aluno_id IN (SELECT aluno_id
      FROM dbo.matriculas
      WHERE id=n.matricula_id) AND v.disciplina_id IN (SELECT disciplina_id
      FROM dbo.matriculas
      WHERE id=n.matricula_id)
  WHERE @search = '' OR v.aluno LIKE '%' + @search + '%' OR v.disciplina LIKE '%' + @search + '%'
  ORDER BY v.aluno OFFSET (@page - 1) * @pageSize ROWS FETCH NEXT @pageSize ROWS ONLY;
END;
GO
CREATE OR ALTER PROCEDURE dbo.sp_notas_get_by_id
  @id INT
AS
SELECT *
FROM dbo.notas
WHERE id=@id;
GO
CREATE OR ALTER PROCEDURE dbo.sp_notas_update
  @id INT,
  @nota1 DECIMAL(5,2),
  @nota2 DECIMAL(5,2),
  @nota3 DECIMAL(5,2)
AS
BEGIN
  UPDATE dbo.notas SET nota1=@nota1, nota2=@nota2, nota3=@nota3, updated_at=SYSUTCDATETIME() WHERE id=@id;
  SELECT *
  FROM dbo.notas
  WHERE id=@id;
END;
GO
CREATE OR ALTER PROCEDURE dbo.sp_notas_delete
  @id INT
AS
BEGIN
  DELETE FROM dbo.notas WHERE id=@id;
  SELECT @id AS id;
END;
GO
CREATE OR ALTER PROCEDURE dbo.sp_notas_por_aluno
  @aluno_id INT
AS
SELECT *
FROM dbo.vw_historico_escolar
WHERE aluno_id=@aluno_id;
GO
CREATE OR ALTER PROCEDURE dbo.sp_notas_por_turma
  @turma_id INT
AS
SELECT *
FROM dbo.vw_notas_por_turma
WHERE turma_id=@turma_id;
GO
