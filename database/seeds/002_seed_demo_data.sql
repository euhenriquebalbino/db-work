USE SchoolGrades;
GO

EXEC dbo.sp_turmas_create @nome='1A Ensino Medio', @semestre='1', @ano=2026;
EXEC dbo.sp_turmas_create @nome='2A Ensino Medio', @semestre='1', @ano=2026;

EXEC dbo.sp_professores_create @nome='Ana Ribeiro', @cpf='11111111111', @email='ana.ribeiro@escola.local', @especialidade='Matematica', @ativo=1;
EXEC dbo.sp_professores_create @nome='Carlos Lima', @cpf='22222222222', @email='carlos.lima@escola.local', @especialidade='Historia', @ativo=1;

EXEC dbo.sp_disciplinas_create @nome='Matematica', @carga_horaria=80, @professor_id=1;
EXEC dbo.sp_disciplinas_create @nome='Historia', @carga_horaria=60, @professor_id=2;

EXEC dbo.sp_alunos_create @nome='Beatriz Souza', @cpf='33333333333', @data_nascimento='2009-03-10', @email='bia@aluno.local', @telefone='11999990000', @matricula='MAT2026001', @turma_id=1;
EXEC dbo.sp_alunos_create @nome='Diego Martins', @cpf='44444444444', @data_nascimento='2008-07-22', @email='diego@aluno.local', @telefone='11999990001', @matricula='MAT2026002', @turma_id=1;

EXEC dbo.sp_matriculas_create @aluno_id=1, @disciplina_id=1;
EXEC dbo.sp_matriculas_create @aluno_id=1, @disciplina_id=2;
EXEC dbo.sp_matriculas_create @aluno_id=2, @disciplina_id=1;

EXEC dbo.sp_notas_create @matricula_id=1, @nota1=8.0, @nota2=7.5, @nota3=9.0;
EXEC dbo.sp_notas_create @matricula_id=2, @nota1=6.0, @nota2=7.0, @nota3=7.0;
EXEC dbo.sp_notas_create @matricula_id=3, @nota1=5.0, @nota2=6.0, @nota3=6.5;
GO
