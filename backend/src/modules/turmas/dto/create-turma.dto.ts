import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";
export class CreateTurmaDto {
  @IsString() @IsNotEmpty() nome!: string;
  @IsString() @IsNotEmpty() semestre!: string;
  @IsInt() @Min(2000) ano!: number;
}
