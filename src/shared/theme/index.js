import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      contrastText: '#fff',
      light: '#42a5f5',
    },
    secondary: {
      main: '#ffa500',
      contrastText: '#000',
    },
    error: {
      main: '#d32f2f',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#0f172a',
      secondary: '#4c5564',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
      lineHeight: 1.2,
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'large',
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600,
          letterSpacing: 0.5,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
        margin: 'normal',
        size: 'medium',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.background.paper,
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          },
        },
      },
      variants: [
        {
          props: { variant: 'product' },
          style: {
            textDecoration: 'none',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          },
        },
        {
          props: { variant: 'listItem' },
          style: ({ theme }) => ({
            display: 'flex',
            gap: theme.spacing(2),
            padding: theme.spacing(2),
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[1],
            alignItems: 'center',
            justifyContent: 'space-between',
          }),
        },
      ],
    },
  },
});
