import { useState } from 'react';
import { Box, Container } from '@mui/material';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          "url('https://static.vecteezy.com/system/resources/thumbnails/012/750/999/small_2x/modern-technology-background-vector.jpg') center/cover no-repeat",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflowY: 'auto',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
        }}
      />

      <Container
        maxWidth="sm"
        sx={{
          position: 'relative',
          zIndex: 10,
        }}
      >
        {showLogin ? (
          <LoginForm onSwitchToRegister={() => setShowLogin(false)} />
        ) : (
          <RegistrationForm onSwitchToLogin={() => setShowLogin(true)} />
        )}
      </Container>
    </Box>
  );
};
export default AuthPage;
