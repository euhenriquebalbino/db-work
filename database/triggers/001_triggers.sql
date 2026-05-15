USE SchoolGrades;
GO

CREATE OR ALTER TRIGGER dbo.trg_disciplinas_professor_ativo
ON dbo.disciplinas
AFTER INSERT, UPDATE
AS
BEGIN
  SET NOCOUNT ON;
  IF EXISTS (
    SELECT 1 FROM inserted i
    JOIN dbo.professores p ON p.id = i.professor_id
    WHERE p.ativo = 0
  )
  BEGIN
    RAISERROR('Professores inativos nao podem receber disciplinas.', 16, 1);
    ROLLBACK TRANSACTION;
    RETURN;
  END
END;
GO

CREATE OR ALTER TRIGGER dbo.trg_notas_validar_calcular
ON dbo.notas
AFTER INSERT, UPDATE
AS
BEGIN
  SET NOCOUNT ON;
  IF EXISTS (SELECT 1 FROM inserted WHERE nota1 NOT BETWEEN 0 AND 10 OR nota2 NOT BETWEEN 0 AND 10 OR nota3 NOT BETWEEN 0 AND 10)
  BEGIN
    RAISERROR('As notas devem variar entre 0 e 10.', 16, 1);
    ROLLBACK TRANSACTION;
    RETURN;
  END;

  UPDATE n
  SET media = ROUND((i.nota1 + i.nota2 + i.nota3) / 3.0, 2),
      situacao = CASE WHEN ROUND((i.nota1 + i.nota2 + i.nota3) / 3.0, 2) >= 7 THEN 'APROVADO' ELSE 'REPROVADO' END,
      updated_at = SYSUTCDATETIME()
  FROM dbo.notas n
  JOIN inserted i ON i.id = n.id;
END;
GO

CREATE OR ALTER TRIGGER dbo.trg_audit_alunos
ON dbo.alunos
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
  SET NOCOUNT ON;
  INSERT INTO dbo.audit_logs(tabela, operacao, registro_id, detalhes)
  SELECT 'alunos',
         CASE WHEN EXISTS (SELECT 1 FROM inserted) AND EXISTS (SELECT 1 FROM deleted) THEN 'UPDATE'
              WHEN EXISTS (SELECT 1 FROM inserted) THEN 'INSERT' ELSE 'DELETE' END,
         COALESCE(i.id, d.id),
         COALESCE(i.nome, d.nome)
  FROM inserted i
  FULL JOIN deleted d ON d.id = i.id;
END;
GO

CREATE OR ALTER TRIGGER dbo.trg_audit_professores
ON dbo.professores
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
  SET NOCOUNT ON;
  INSERT INTO dbo.audit_logs(tabela, operacao, registro_id, detalhes)
  SELECT 'professores',
         CASE WHEN EXISTS (SELECT 1 FROM inserted) AND EXISTS (SELECT 1 FROM deleted) THEN 'UPDATE'
              WHEN EXISTS (SELECT 1 FROM inserted) THEN 'INSERT' ELSE 'DELETE' END,
         COALESCE(i.id, d.id),
         COALESCE(i.nome, d.nome)
  FROM inserted i FULL JOIN deleted d ON d.id = i.id;
END;
GO

CREATE OR ALTER TRIGGER dbo.trg_audit_academico
ON dbo.notas
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
  SET NOCOUNT ON;
  INSERT INTO dbo.audit_logs(tabela, operacao, registro_id, detalhes)
  SELECT 'notas',
         CASE WHEN EXISTS (SELECT 1 FROM inserted) AND EXISTS (SELECT 1 FROM deleted) THEN 'UPDATE'
              WHEN EXISTS (SELECT 1 FROM inserted) THEN 'INSERT' ELSE 'DELETE' END,
         COALESCE(i.id, d.id),
         CONCAT('matricula_id=', COALESCE(i.matricula_id, d.matricula_id))
  FROM inserted i FULL JOIN deleted d ON d.id = i.id;
END;
GO
