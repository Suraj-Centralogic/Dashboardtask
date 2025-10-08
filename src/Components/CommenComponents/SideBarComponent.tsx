import React from 'react';
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Switch,
  TextField,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type Font = {
  id: string;
  name: string;
  stylesCount: number;
  inProd: boolean;
};

type Props = {
  handleOpenSidebar: () => void;
  fonts: Font[];
  toggleFontInProd: (id: string) => void; // function to toggle "In prod" state
};

const SideBarComponent: React.FC<Props> = ({
  handleOpenSidebar,
  fonts,
  toggleFontInProd,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  // Filter fonts based on search input
  const filteredFonts = fonts.filter((font) =>
    font.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '46vw',
        height: '100vh',
        bgcolor: 'background.paper',
        zIndex: 999,
        overflowY: 'auto',
        p: 4,
        mt: 9,
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={handleOpenSidebar}
        sx={{ position: 'absolute', top: 16, right: 16 }}
      >
        <CloseIcon />
      </IconButton>

      {/* Title */}
      <Typography
        gutterBottom
        sx={{ fontWeight: '700', fontSize: '14px', textAlign: 'left', mb: 3 }}
      >
        Add new production font
      </Typography>

      {/* Search Input */}
      <TextField
        placeholder="Search fonts"
        size="small"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Fonts List Header */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr auto auto',
          fontWeight: '600',
          fontSize: '12px',
          color: 'text.secondary',
          mb: 1,
          borderBottom: '1px solid #ddd',
          pb: 1,
        }}
      >
        <Box>Font name</Box>
        <Box>Styles</Box>
        <Box>In prod</Box>
      </Box>

      {/* Fonts List */}
      {filteredFonts.map((font) => (
        <Box
          key={font.id}
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr auto auto',
            alignItems: 'center',
            py: 1,
            borderBottom: '1px solid #eee',
          }}
        >
          {/* Checkbox + Font Name */}
          <FormControlLabel
            control={<Checkbox />}
            label={
              <Typography sx={{ fontSize: '14px' }}>{font.name}</Typography>
            }
            sx={{ m: 0 }}
          />

          {/* Styles count */}
          <Typography
            sx={{
              fontSize: '14px',
              textAlign: 'center',
              color: 'text.secondary',
            }}
          >
            {font.stylesCount} styles
          </Typography>

          {/* In Prod Toggle */}
          <Switch
            checked={font.inProd}
            onChange={() => toggleFontInProd(font.id)}
            color="primary"
            inputProps={{ 'aria-label': 'in production toggle' }}
            sx={{ justifySelf: 'center' }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default SideBarComponent;
