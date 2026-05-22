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
import { MatriculasService } from "./matriculas.service";
import { CreateMatriculaDto } from "./dto/create-matricula.dto";
import { UpdateMatriculaDto } from "./dto/update-matricula.dto";
@ApiTags("matriculas")
@Controller("matriculas")
export class MatriculasController {
  constructor(private readonly service: MatriculasService) {}
  @Post() create(@Body() dto: CreateMatriculaDto) {
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
    @Body() dto: UpdateMatriculaDto,
  ) {
    return this.service.update(id, dto);
  }
  @Delete(":id") remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
