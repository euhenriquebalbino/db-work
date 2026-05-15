import { createContext, PropsWithChildren, useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

type ColorModeContextValue = { toggle: () => void; mode: 'light' | 'dark' };

export const ColorModeContext = createContext<ColorModeContextValue>({ toggle: () => undefined, mode: 'dark' });

export function ColorModeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const value = useMemo(() => ({ mode, toggle: () => setMode((m) => (m === 'light' ? 'dark' : 'light')) }), [mode]);
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: '#246BFE' },
      secondary: { main: '#00897B' },
      background: {
        default: mode === 'light' ? '#f6f8fb' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#121212'
      },
      divider: mode === 'light' ? 'rgba(15, 23, 42, 0.12)' : 'rgba(255, 255, 255, 0.08)'
    },
    shape: { borderRadius: 8 },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            border: 0,
            boxShadow: 'none'
          }
        }
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottomColor: mode === 'light' ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.08)'
          }
        }
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            boxShadow: 'none'
          }
        }
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: 0
          }
        }
      }
    }
  }), [mode]);
  return <ColorModeContext.Provider value={value}><ThemeProvider theme={theme}>{children}</ThemeProvider></ColorModeContext.Provider>;
}
