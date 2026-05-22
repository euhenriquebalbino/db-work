import { IsInt, IsNumber, IsOptional, Max, Min } from "class-validator";
export class UpdateNotaDto {
  @IsOptional() @IsInt() matricula_id?: number;
  @IsNumber() @Min(0) @Max(10) nota1!: number;
  @IsNumber() @Min(0) @Max(10) nota2!: number;
  @IsNumber() @Min(0) @Max(10) nota3!: number;
}
