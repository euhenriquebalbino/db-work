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
import { DisciplinasService } from "./disciplinas.service";
import { CreateDisciplinaDto } from "./dto/create-disciplina.dto";
import { UpdateDisciplinaDto } from "./dto/update-disciplina.dto";
@ApiTags("disciplinas")
@Controller("disciplinas")
export class DisciplinasController {
  constructor(private readonly service: DisciplinasService) {}
  @Post() create(@Body() dto: CreateDisciplinaDto) {
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
    @Body() dto: UpdateDisciplinaDto,
  ) {
    return this.service.update(id, dto);
  }
  @Delete(":id") remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
