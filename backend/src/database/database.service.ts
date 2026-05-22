import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as sql from "mssql";

export type ProcedureParamValue =
  | string
  | number
  | boolean
  | Date
  | null
  | undefined;
export type ProcedureParams = Record<string, ProcedureParamValue>;

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  private pool?: sql.ConnectionPool;

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    this.pool = await new sql.ConnectionPool({
      server: this.config.getOrThrow<string>("DB_HOST"),
      port: Number(this.config.get<string>("DB_PORT", "1433")),
      user: this.config.getOrThrow<string>("DB_USER"),
      password: this.config.getOrThrow<string>("DB_PASSWORD"),
      database: this.config.getOrThrow<string>("DB_NAME"),
      options: {
        encrypt: this.config.get<string>("DB_ENCRYPT", "false") === "true",
        trustServerCertificate:
          this.config.get<string>("DB_TRUST_SERVER_CERTIFICATE", "true") ===
          "true",
      },
    }).connect();
    this.logger.log("SQL Server conectado");
  }

  async executeProcedure<T>(
    procedure: string,
    params: object = {},
  ): Promise<T[]> {
    if (!this.pool) {
      throw new Error("Pool SQL Server nao inicializado");
    }

    const request = this.pool.request();
    Object.entries(params ?? {}).forEach(([key, value]) =>
      request.input(key, value as ProcedureParamValue),
    );
    try {
      const result = await request.execute<T>(procedure);
      return result.recordset ?? [];
    } catch (error) {
      const sqlError = error as {
        number?: number;
        message?: string;
        originalError?: { info?: { message?: string } };
      };
      const message =
        sqlError.originalError?.info?.message ??
        sqlError.message ??
        "Erro ao executar procedure.";

      if (sqlError.number === 2601 || sqlError.number === 2627) {
        throw new ConflictException("Ja existe um registro com estes dados.");
      }

      if (sqlError.number === 547) {
        throw new ConflictException(
          "Nao e possivel excluir ou alterar este registro porque existem dados vinculados a ele.",
        );
      }

      throw new BadRequestException(message);
    }
  }

  async onModuleDestroy() {
    await this.pool?.close();
  }
}
