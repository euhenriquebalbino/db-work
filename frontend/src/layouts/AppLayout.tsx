import { PropsWithChildren, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Box, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Brightness4, Dashboard, Groups, MenuBook, Person, School, Assignment, BarChart, Badge } from '@mui/icons-material';
import { ColorModeContext } from '../contexts/ColorModeContext';

const links = [
  { to: '/', label: 'Dashboard', icon: <Dashboard /> },
  { to: '/alunos', label: 'Alunos', icon: <School /> },
  { to: '/professores', label: 'Professores', icon: <Person /> },
  { to: '/disciplinas', label: 'Disciplinas', icon: <MenuBook /> },
  { to: '/turmas', label: 'Turmas', icon: <Groups /> },
  { to: '/matriculas', label: 'Matriculas', icon: <Badge /> },
  { to: '/notas', label: 'Notas', icon: <Assignment /> },
  { to: '/relatorios', label: 'Relatorios', icon: <BarChart /> }
];

export function AppLayout({ children }: PropsWithChildren) {
  const { pathname } = useLocation();
  const colorMode = useContext(ColorModeContext);
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="fixed" elevation={0} sx={{ zIndex: 1300, bgcolor: 'background.default', color: 'text.primary' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Gestao Escolar</Typography>
          <IconButton color="inherit" onClick={colorMode.toggle} aria-label="Alternar tema"><Brightness4 /></IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" sx={{ width: 240, '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box', bgcolor: 'background.default' } }}>
        <Toolbar />
        <List>
          {links.map((link) => (
            <ListItemButton key={link.to} component={Link} to={link.to} selected={pathname === link.to}>
              <ListItemIcon>{link.icon}</ListItemIcon><ListItemText primary={link.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, bgcolor: 'background.default' }}>{children}</Box>
    </Box>
  );
}
