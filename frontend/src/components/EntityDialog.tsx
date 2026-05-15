import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Stack, TextField, Switch, FormControlLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import { Entity, FormField } from '../types/api';

type Props = { open: boolean; title: string; fields: FormField[]; initial?: Entity; onClose: () => void; onSubmit: (payload: Entity) => void };

export function EntityDialog({ open, title, fields, initial, onClose, onSubmit }: Props) {
  const [form, setForm] = useState<Entity>({});
  useEffect(() => setForm(initial ?? {}), [initial, open]);
  const setValue = (name: string, value: string | number | boolean) => setForm((current) => ({ ...current, [name]: value }));
  const submit = () => onSubmit(form);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          {fields.map((field) => field.type === 'boolean' ? (
            <FormControlLabel key={field.name} control={<Switch checked={Boolean(form[field.name])} onChange={(_, checked) => setValue(field.name, checked)} />} label={field.label} />
          ) : (
            <TextField
              key={field.name}
              label={field.label}
              type={field.type ?? 'text'}
              required={field.required}
              value={form[field.name] ?? ''}
              onChange={(event) => setValue(field.name, field.type === 'number' ? Number(event.target.value) : event.target.value)}
              fullWidth
            />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={submit}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
