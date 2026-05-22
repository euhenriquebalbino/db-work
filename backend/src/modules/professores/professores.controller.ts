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
import { ProfessoresService } from "./professores.service";
import { CreateProfessorDto } from "./dto/create-professor.dto";
import { UpdateProfessorDto } from "./dto/update-professor.dto";

@ApiTags("professores")
@Controller("professores")
export class ProfessoresController {
  constructor(private readonly service: ProfessoresService) {}
  @Post() create(@Body() dto: CreateProfessorDto) {
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
    @Body() dto: UpdateProfessorDto,
  ) {
    return this.service.update(id, dto);
  }
  @Delete(":id") remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
