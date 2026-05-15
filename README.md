# Sistema de Gerenciamento Escolar

Sistema full stack acadêmico para controle de alunos, professores, turmas, disciplinas, matrículas, notas, médias e relatórios escolares.

O fluxo da aplicação é:

```text
Frontend React -> Backend NestJS -> Stored Procedures -> SQL Server
```

O backend não executa SQL direto. Toda operação de leitura, criação, edição e exclusão passa obrigatoriamente por stored procedures.

## Tecnologias

- Frontend: React.js, TypeScript, Material UI, Axios, Recharts, jsPDF
- Backend: Node.js, TypeScript, NestJS, class-validator, Swagger
- Banco de dados: SQL Server
- Driver SQL Server: `mssql`
- API: REST
- Gerenciador de pacotes: npm
- Banco local: Docker com SQL Server 2022

## Estrutura

```text
/backend   API NestJS
/frontend  Aplicação React
/database  Tabelas, procedures, triggers, views e seeds
/docs      DER, modelo lógico, modelo físico, regras e API
```

## Pré-requisitos

Para rodar em qualquer sistema operacional, instale:

- Git
- Node.js LTS, recomendado Node 20 ou 22
- npm, já vem com Node.js
- Docker
- Docker Compose

Para visualizar o banco em tempo real no Windows 11:

- SQL Server Management Studio, também chamado SSMS
- ou Azure Data Studio

No Windows 11, a forma mais simples é instalar:

- Git for Windows
- Node.js LTS
- Docker Desktop
- SQL Server Management Studio

## Configuração Inicial

Clone ou abra a pasta do projeto:

```bash
cd caminho/para/db-work
```

Instale as dependências do backend:

```bash
cd backend
npm install
```

Crie o arquivo de ambiente do backend:

Windows PowerShell:

```powershell
copy .env.example .env
```

Linux/macOS:

```bash
cp .env.example .env
```

O arquivo `backend/.env` deve ficar assim para usar o SQL Server do Docker:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=1433
DB_USER=sa
DB_PASSWORD=Your_strong_password123
DB_NAME=SchoolGrades
DB_ENCRYPT=false
DB_TRUST_SERVER_CERTIFICATE=true
```

Instale as dependências do frontend:

```bash
cd ../frontend
npm install
```

Crie o arquivo de ambiente do frontend:

Windows PowerShell:

```powershell
copy .env.example .env
```

Linux/macOS:

```bash
cp .env.example .env
```

O arquivo `frontend/.env` deve conter:

```env
VITE_API_URL=http://localhost:3000/api
```

Volte para a raiz do projeto:

```bash
cd ..
```

## Iniciar o Banco SQL Server

Na raiz do projeto, execute:

```bash
docker compose up -d
```

Isso sobe um container SQL Server com:

```text
Host: localhost
Porta: 1433
Usuário: sa
Senha: Your_strong_password123
Banco: SchoolGrades
```

Verifique se o container está rodando:

```bash
docker ps
```

Se aparecer `school-grades-sqlserver`, o banco está ativo.

## Criar as Tabelas, Views, Triggers e Procedures

Execute os scripts SQL nesta ordem:

```text
database/tables/001_schema.sql
database/views/001_views.sql
database/triggers/001_triggers.sql
database/procedures/001_crud_procedures.sql
database/procedures/002_report_procedures.sql
```

O banco inicia vazio por padrão. O arquivo `database/seeds/001_seed_data.sql` não cadastra exemplos.

Se quiser dados de demonstração, execute manualmente:

```text
database/seeds/002_seed_demo_data.sql
```

### Opção A: Executar pelo SQL Server Management Studio no Windows 11

1. Abra o SQL Server Management Studio.
2. Clique em `Connect`.
3. Use:

```text
Server type: Database Engine
Server name: localhost,1433
Authentication: SQL Server Authentication
Login: sa
Password: Your_strong_password123
Trust server certificate: marcado
```

4. Abra cada arquivo SQL na ordem indicada.
5. Clique em `Execute` para cada script.

### Opção B: Executar pelo terminal usando Docker

Windows PowerShell, na raiz do projeto:

```powershell
Get-Content -Raw .\database\tables\001_schema.sql | docker exec -i school-grades-sqlserver /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "Your_strong_password123" -C
Get-Content -Raw .\database\views\001_views.sql | docker exec -i school-grades-sqlserver /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "Your_strong_password123" -C
Get-Content -Raw .\database\triggers\001_triggers.sql | docker exec -i school-grades-sqlserver /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "Your_strong_password123" -C
Get-Content -Raw .\database\procedures\001_crud_procedures.sql | docker exec -i school-grades-sqlserver /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "Your_strong_password123" -C
Get-Content -Raw .\database\procedures\002_report_procedures.sql | docker exec -i school-grades-sqlserver /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "Your_strong_password123" -C
```

Linux/macOS:

```bash
docker exec -i school-grades-sqlserver /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P 'Your_strong_password123' -C < database/tables/001_schema.sql
docker exec -i school-grades-sqlserver /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P 'Your_strong_password123' -C < database/views/001_views.sql
docker exec -i school-grades-sqlserver /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P 'Your_strong_password123' -C < database/triggers/001_triggers.sql
docker exec -i school-grades-sqlserver /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P 'Your_strong_password123' -C < database/procedures/001_crud_procedures.sql
docker exec -i school-grades-sqlserver /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P 'Your_strong_password123' -C < database/procedures/002_report_procedures.sql
```

## Iniciar o Backend

Abra um terminal na raiz do projeto:

```bash
cd backend
npm run start:dev
```

Se tudo estiver correto, o terminal deve mostrar que o Nest iniciou e conectou ao SQL Server.

API:

```text
http://localhost:3000/api
```

Swagger:

```text
http://localhost:3000/api/docs
```

Use o Swagger para testar os endpoints REST do backend.

## Iniciar a Aplicação Web

Abra outro terminal na raiz do projeto:

```bash
cd frontend
npm run dev
```

Abra no navegador:

```text
http://localhost:5173
```

## Visualizar os Dados em Tempo Real no Windows 11

Sim, é possível visualizar os dados em tempo real no aplicativo da Microsoft.

O recomendado é usar o SQL Server Management Studio, conhecido como SSMS. Ele conecta no SQL Server que está rodando no Docker porque a porta `1433` está exposta no `docker-compose.yml`.

Conexão no SSMS:

```text
Server type: Database Engine
Server name: localhost,1433
Authentication: SQL Server Authentication
Login: sa
Password: Your_strong_password123
Trust server certificate: marcado
```

Depois de conectar:

1. Expanda `Databases`.
2. Expanda `SchoolGrades`.
3. Expanda `Tables`.
4. Clique com o botão direito em uma tabela, por exemplo `dbo.alunos`.
5. Selecione `Select Top 1000 Rows`.

Enquanto você cria, edita ou exclui dados no app web, basta executar novamente o `SELECT` ou atualizar a consulta no SSMS para ver os dados atuais.

Consultas úteis para apresentação:

```sql
USE SchoolGrades;

SELECT * FROM dbo.turmas;
SELECT * FROM dbo.professores;
SELECT * FROM dbo.disciplinas;
SELECT * FROM dbo.alunos;
SELECT * FROM dbo.matriculas;
SELECT * FROM dbo.notas;

SELECT * FROM dbo.vw_historico_escolar;
SELECT * FROM dbo.vw_notas_por_turma;
SELECT * FROM dbo.vw_media_alunos;
```

Também é possível usar Azure Data Studio com os mesmos dados de conexão.

## Roteiro Para Apresentação

Como as entidades possuem dependências, cadastre nesta ordem:

```text
Turma -> Professor -> Disciplina -> Aluno -> Matrícula -> Nota -> Relatórios
```

Para excluir sem violar integridade referencial, exclua na ordem inversa:

```text
Nota -> Matrícula -> Aluno -> Disciplina -> Professor -> Turma
```

Exemplo de apresentação:

1. Crie uma turma.
2. Crie um professor.
3. Crie uma disciplina vinculada ao professor.
4. Crie um aluno vinculado à turma.
5. Matricule o aluno em uma disciplina.
6. Lance três notas.
7. Mostre que a média e a situação são calculadas automaticamente.
8. Abra o Dashboard e clique em `Atualizar`.
9. Abra o SSMS e execute `SELECT * FROM dbo.alunos` ou `SELECT * FROM dbo.notas`.
10. Edite um cadastro pelo app e rode o `SELECT` novamente no SSMS.
11. Delete um cadastro respeitando a ordem inversa.

## Parar o Projeto

Para parar backend e frontend, pressione `Ctrl+C` nos terminais.

Para parar o SQL Server:

```bash
docker compose down
```

Para apagar também o volume do banco, use:

```bash
docker compose down -v
```

Atenção: `docker compose down -v` apaga os dados do banco.

## Garantia Arquitetural

O backend não executa SQL direto. Os repositórios chamam apenas `DatabaseService.executeProcedure`, que usa `request.execute(procedure)`.

Camada por camada:

```text
Controller -> Service -> Repository -> Stored Procedure -> Banco SQL Server
```

## Recursos

- CRUD completo de alunos, professores, disciplinas, turmas, matrículas e notas
- Validação no frontend e backend
- Constraints, chaves estrangeiras, índices e unicidade no banco
- Triggers para validação, cálculo de média/situação e auditoria
- Views para consultas acadêmicas
- Relatórios acadêmicos e exportação PDF no frontend
- Dashboard com indicadores dinâmicos
- Tema dark por padrão
- Tratamento global de erros na API
