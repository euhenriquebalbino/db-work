import { Add, Delete, Edit, Search } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { crudService } from "../services/crudService";
import { Entity, FormField, TableColumn } from "../types/api";
import { EntityDialog } from "./EntityDialog";

type Props = {
  title: string;
  resource: string;
  fields: FormField[];
  columns: TableColumn[];
};

export function EntityPage({ title, resource, fields, columns }: Props) {
  const [rows, setRows] = useState<Entity[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Entity | undefined>();
  const [pendingDelete, setPendingDelete] = useState<Entity | undefined>();
  const [open, setOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [message, setMessage] = useState("");
  const total = useMemo(() => Number(rows[0]?.total ?? rows.length), [rows]);

  async function load() {
    setLoading(true);
    try {
      setRows(await crudService.list(resource, search, page + 1, pageSize));
    } catch (error) {
      setMessage(String(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, [resource, page, pageSize]);

  function getFormPayload(payload: Entity) {
    return fields.reduce<Entity>((result, field) => {
      result[field.name] = payload[field.name];
      return result;
    }, {});
  }

  async function save(payload: Entity) {
    const formPayload = getFormPayload(payload);
    try {
      editing?.id
        ? await crudService.update(resource, Number(editing.id), formPayload)
        : await crudService.create(resource, formPayload);
      setMessage("Registro salvo com sucesso.");
      setOpen(false);
      setEditing(undefined);
      await load();
    } catch (error) {
      setMessage(String(error));
    }
  }

  async function remove() {
    if (!pendingDelete?.id) return;
    setDeleteLoading(true);
    try {
      await crudService.remove(resource, Number(pendingDelete.id));
      setMessage("Registro excluido.");
      setPendingDelete(undefined);
      await load();
    } catch (error) {
      setMessage(String(error));
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <Stack spacing={2}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        spacing={2}
      >
        <Typography variant="h4">{title}</Typography>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => {
            setEditing(undefined);
            setOpen(true);
          }}
        >
          Novo
        </Button>
      </Stack>
      <TextField
        placeholder="Buscar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && load()}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <Paper sx={{ bgcolor: "background.default" }}>
        {loading ? (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.key}>{column.label}</TableCell>
                ))}
                <TableCell align="right">Acoes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={String(row.id)} hover>
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {String(row[column.key] ?? "")}
                    </TableCell>
                  ))}
                  <TableCell align="right">
                    <IconButton
                      aria-label="Editar"
                      onClick={() => {
                        setEditing(row);
                        setOpen(true);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      aria-label="Excluir"
                      color="error"
                      onClick={() => setPendingDelete(row)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <TablePagination
          component="div"
          count={total}
          page={page}
          rowsPerPage={pageSize}
          onPageChange={(_, p) => setPage(p)}
          onRowsPerPageChange={(e) => setPageSize(Number(e.target.value))}
        />
      </Paper>
      <EntityDialog
        open={open}
        title={editing ? `Editar ${title}` : `Novo ${title}`}
        fields={fields}
        initial={editing}
        onClose={() => setOpen(false)}
        onSubmit={save}
      />
      <Dialog
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(undefined)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirmar exclusao</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deseja excluir este registro? Esta acao nao pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setPendingDelete(undefined)}
            disabled={deleteLoading}
          >
            Cancelar
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={remove}
            disabled={deleteLoading}
          >
            {deleteLoading ? "Excluindo..." : "Excluir"}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={Boolean(message)}
        autoHideDuration={4000}
        onClose={() => setMessage("")}
      >
        <Alert
          severity={
            message.includes("sucesso") || message.includes("excluido")
              ? "success"
              : "error"
          }
        >
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
