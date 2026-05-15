import { IsDateString, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateAlunoDto {
  @IsString() @IsNotEmpty() nome!: string;
  @IsString() @Length(11, 14) cpf!: string;
  @IsDateString() data_nascimento!: string;
  @IsEmail() email!: string;
  @IsOptional() @IsString() telefone?: string;
  @IsString() @IsNotEmpty() matricula!: string;
  @IsInt() turma_id!: number;
}
