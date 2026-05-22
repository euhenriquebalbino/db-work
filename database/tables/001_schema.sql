IF DB_ID('SchoolGrades') IS NULL CREATE DATABASE SchoolGrades;
GO
USE SchoolGrades;
GO

CREATE TABLE dbo.turmas
(
  id INT IDENTITY(1,1) CONSTRAINT pk_turmas PRIMARY KEY,
  nome NVARCHAR(80) NOT NULL,
  semestre NVARCHAR(20) NOT NULL,
  ano INT NOT NULL CONSTRAINT ck_turmas_ano CHECK (ano >= 2000),
  created_at DATETIME2 NOT NULL CONSTRAINT df_turmas_created_at DEFAULT SYSUTCDATETIME(),
  updated_at DATETIME2 NOT NULL CONSTRAINT df_turmas_updated_at DEFAULT SYSUTCDATETIME(),
  CONSTRAINT uq_turmas_nome_periodo UNIQUE (nome, semestre, ano)
);

CREATE TABLE dbo.alunos
(
  id INT IDENTITY(1,1) CONSTRAINT pk_alunos PRIMARY KEY,
  nome NVARCHAR(120) NOT NULL,
  cpf VARCHAR(14) NOT NULL,
  data_nascimento DATE NOT NULL,
  email NVARCHAR(160) NOT NULL,
  telefone NVARCHAR(30) NULL,
  matricula NVARCHAR(30) NOT NULL,
  turma_id INT NOT NULL,
  created_at DATETIME2 NOT NULL CONSTRAINT df_alunos_created_at DEFAULT SYSUTCDATETIME(),
  updated_at DATETIME2 NOT NULL CONSTRAINT df_alunos_updated_at DEFAULT SYSUTCDATETIME(),
  CONSTRAINT uq_alunos_cpf UNIQUE (cpf),
  CONSTRAINT uq_alunos_matricula UNIQUE (matricula),
  CONSTRAINT fk_alunos_turmas FOREIGN KEY (turma_id) REFERENCES dbo.turmas(id)
);

CREATE TABLE dbo.professores
(
  id INT IDENTITY(1,1) CONSTRAINT pk_professores PRIMARY KEY,
  nome NVARCHAR(120) NOT NULL,
  cpf VARCHAR(14) NOT NULL,
  email NVARCHAR(160) NOT NULL,
  especialidade NVARCHAR(120) NOT NULL,
  ativo BIT NOT NULL CONSTRAINT df_professores_ativo DEFAULT 1,
  created_at DATETIME2 NOT NULL CONSTRAINT df_professores_created_at DEFAULT SYSUTCDATETIME(),
  updated_at DATETIME2 NOT NULL CONSTRAINT df_professores_updated_at DEFAULT SYSUTCDATETIME(),
  CONSTRAINT uq_professores_cpf UNIQUE (cpf),
  CONSTRAINT uq_professores_email UNIQUE (email)
);

CREATE TABLE dbo.disciplinas
(
  id INT IDENTITY(1,1) CONSTRAINT pk_disciplinas PRIMARY KEY,
  nome NVARCHAR(120) NOT NULL,
  carga_horaria INT NOT NULL CONSTRAINT ck_disciplinas_carga CHECK (carga_horaria > 0),
  professor_id INT NOT NULL,
  created_at DATETIME2 NOT NULL CONSTRAINT df_disciplinas_created_at DEFAULT SYSUTCDATETIME(),
  updated_at DATETIME2 NOT NULL CONSTRAINT df_disciplinas_updated_at DEFAULT SYSUTCDATETIME(),
  CONSTRAINT uq_disciplinas_nome UNIQUE (nome),
  CONSTRAINT fk_disciplinas_professores FOREIGN KEY (professor_id) REFERENCES dbo.professores(id)
);

CREATE TABLE dbo.matriculas
(
  id INT IDENTITY(1,1) CONSTRAINT pk_matriculas PRIMARY KEY,
  aluno_id INT NOT NULL,
  disciplina_id INT NOT NULL,
  data_matricula DATETIME2 NOT NULL CONSTRAINT df_matriculas_data DEFAULT SYSUTCDATETIME(),
  CONSTRAINT uq_matriculas_aluno_disciplina UNIQUE (aluno_id, disciplina_id),
  CONSTRAINT fk_matriculas_alunos FOREIGN KEY (aluno_id) REFERENCES dbo.alunos(id),
  CONSTRAINT fk_matriculas_disciplinas FOREIGN KEY (disciplina_id) REFERENCES dbo.disciplinas(id)
);

CREATE TABLE dbo.notas
(
  id INT IDENTITY(1,1) CONSTRAINT pk_notas PRIMARY KEY,
  matricula_id INT NOT NULL,
  nota1 DECIMAL(5,2) NOT NULL,
  nota2 DECIMAL(5,2) NOT NULL,
  nota3 DECIMAL(5,2) NOT NULL,
  media DECIMAL(5,2) NULL,
  situacao NVARCHAR(20) NULL,
  created_at DATETIME2 NOT NULL CONSTRAINT df_notas_created_at DEFAULT SYSUTCDATETIME(),
  updated_at DATETIME2 NOT NULL CONSTRAINT df_notas_updated_at DEFAULT SYSUTCDATETIME(),
  CONSTRAINT uq_notas_matricula UNIQUE (matricula_id),
  CONSTRAINT fk_notas_matriculas FOREIGN KEY (matricula_id) REFERENCES dbo.matriculas(id),
  CONSTRAINT ck_notas_intervalo CHECK (nota1 BETWEEN 0 AND 10 AND nota2 BETWEEN 0 AND 10 AND nota3 BETWEEN 0 AND 10)
);

CREATE TABLE dbo.audit_logs
(
  id BIGINT IDENTITY(1,1) CONSTRAINT pk_audit_logs PRIMARY KEY,
  tabela NVARCHAR(80) NOT NULL,
  operacao NVARCHAR(20) NOT NULL,
  registro_id INT NULL,
  detalhes NVARCHAR(500) NULL,
  created_at DATETIME2 NOT NULL CONSTRAINT df_audit_logs_created_at DEFAULT SYSUTCDATETIME()
);

CREATE INDEX ix_alunos_nome ON dbo.alunos(nome);
CREATE INDEX ix_alunos_turma ON dbo.alunos(turma_id);
CREATE INDEX ix_professores_nome ON dbo.professores(nome);
CREATE INDEX ix_disciplinas_professor ON dbo.disciplinas(professor_id);
CREATE INDEX ix_matriculas_aluno ON dbo.matriculas(aluno_id);
CREATE INDEX ix_matriculas_disciplina ON dbo.matriculas(disciplina_id);
CREATE INDEX ix_notas_media ON dbo.notas(media DESC);
GO
