import * as React from 'react';
import { Paper, Avatar, AvatarGroup, Stack, Typography, Box } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import DesktopMacOutlinedIcon from '@mui/icons-material/DesktopMacOutlined';

type Stat = {
  title: string;
  value: string | number;
  change?: { dir: 'up' | 'down'; text: string };
  Icon: React.ElementType;
  avatars?: string[];
};

const stats: Stat[] = [
  {
    title: 'Total Customers',
    value: '5,423',
    change: { dir: 'up', text: '16% this month' },
    Icon: Groups2OutlinedIcon,
  },
  {
    title: 'Members',
    value: '1,893',
    change: { dir: 'down', text: '1% this month' },
    Icon: PersonOutlineOutlinedIcon,
  },
  {
    title: 'Active Now',
    value: '189',
    Icon: DesktopMacOutlinedIcon,
    avatars: [
      'https://i.pravatar.cc/150?img=1',
      'https://i.pravatar.cc/150?img=2',
      'https://i.pravatar.cc/150?img=3',
      'https://i.pravatar.cc/150?img=4',
    ],
  },
];

const StatsCards = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 1,
        bgcolor: '#fff',
        boxShadow: '0 6px 24px rgba(0,0,0,0.06)',
        p: 2,
      }}
    >
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '100%' }}>
        {stats.map((item, index) => (
          <Stack
            key={index}
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{
              width: '100%',
              p: 2,
              borderRadius: 1,
              bgcolor: '#F9FAFB',
            }}
          >
            <Box sx={{ flex: '40%', display: 'flex', justifyContent: 'flex-end' }}>
              <Avatar
                sx={{
                  bgcolor: 'rgba(16,185,129,0.12)',
                  color: 'success.main',
                  width: 66,
                  height: 66,
                }}
              >
                <item.Icon fontSize="medium" />
              </Avatar>
            </Box>

            <Box
              sx={{
                flex: '60%',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'start',
              }}
            >
              <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                {item.title}
              </Typography>

              <Stack spacing={0.5} alignItems="flex-start">
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1E293B', textAlign: 'start' }}>
                  {item.value}
                </Typography>
              </Stack>
              {item.change && (
                <Stack direction="row" spacing={0.5} alignItems="start">
                  {item.change.dir === 'up' ? (
                    <ArrowDropUpIcon sx={{ color: '#22C55E', fontSize: 20 }} />
                  ) : (
                    <ArrowDropDownIcon sx={{ color: '#EF4444', fontSize: 20 }} />
                  )}
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 600,
                      color: item.change.dir === 'up' ? '#22C55E' : '#EF4444',
                    }}
                  >
                    {item.change.text}
                  </Typography>
                </Stack>
              )}
              {item.avatars && (
                <Box sx={{ ml: -20 }}>
                  <AvatarGroup
                    max={5}
                    sx={{
                      mt: 1,
                      '& .MuiAvatar-root': {
                        width: 28,
                        height: 28,
                        fontSize: 14,
                        border: '2px solid #fff',
                      },
                    }}
                  >
                    {item.avatars.map((src, i) => (
                      <Avatar key={i} src={src} />
                    ))}
                  </AvatarGroup>
                </Box>
              )}
            </Box>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
};
export default StatsCards;
