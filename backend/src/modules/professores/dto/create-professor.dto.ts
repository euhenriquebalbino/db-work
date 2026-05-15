import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateProfessorDto {
  @IsString() @IsNotEmpty() nome!: string;
  @IsString() @Length(11, 14) cpf!: string;
  @IsEmail() email!: string;
  @IsString() @IsNotEmpty() especialidade!: string;
  @IsOptional() @IsBoolean() ativo?: boolean;
}
