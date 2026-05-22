import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AlunosService } from "./alunos.service";
import { CreateAlunoDto } from "./dto/create-aluno.dto";
import { UpdateAlunoDto } from "./dto/update-aluno.dto";

@ApiTags("alunos")
@Controller("alunos")
export class AlunosController {
  constructor(private readonly service: AlunosService) {}

  @Post() create(@Body() dto: CreateAlunoDto) {
    return this.service.create(dto);
  }
  @Get() findAll(
    @Query("search") search = "",
    @Query("page") page = "1",
    @Query("pageSize") pageSize = "10",
  ) {
    return this.service.findAll(search, Number(page), Number(pageSize));
  }
  @Get(":id") findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }
  @Patch(":id") update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateAlunoDto,
  ) {
    return this.service.update(id, dto);
  }
  @Delete(":id") remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
