# Regras de Negócio

- Cada aluno pertence obrigatoriamente a uma turma.
- Um aluno pode cursar várias disciplinas por meio de matrículas.
- Uma disciplina possui um professor responsável.
- Professores inativos não podem ser vinculados a novas disciplinas.
- Cada matrícula possui no máximo um registro de notas, contendo nota1, nota2 e nota3.
- As notas devem variar de 0 a 10.
- A média é calculada automaticamente no banco.
- Média maior ou igual a 7 indica `APROVADO`; abaixo de 7 indica `REPROVADO`.
- CPF e matrícula de aluno são únicos.
- CPF e email de professor são únicos.
- Não é permitido excluir turma com alunos vinculados.
- Não é permitido excluir disciplina com notas lançadas.
- Registros principais possuem datas de criação e atualização.
