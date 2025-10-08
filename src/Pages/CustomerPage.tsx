import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client/react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import {
  GET_CUSTOMERS,
  CREATE_CUSTOMER,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMER,
  USER_UPDATED_SUBSCRIPTION,
  USER_DELETED_SUBSCRIPTION,
} from '../apollo/queries';
import {
  Typography,
  CircularProgress,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import Licensedashboard from '../Components/MonotypeCOmponents/Licensedashboard';
import SideBarComponent from '../Components/CommenComponents/SideBarComponent';
import { FixedSizeList, FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

interface User {
  id: string;
  name: string;
  email: string;
}

interface GetCustomersResponse {
  users: {
    data: User[];
  };
}

type UserUpdatedSubscriptionData = {
  userUpdated: User;
};

type UserDeletedSubscriptionData = {
  userDeleted: User;
};

const CustomerPage = () => {
  const { data, loading, error, refetch } =
    useQuery<GetCustomersResponse>(GET_CUSTOMERS);
  const { data: subscriptionData } =
    useSubscription<UserUpdatedSubscriptionData>(USER_UPDATED_SUBSCRIPTION);
  const { data: userDeletedData } =
    useSubscription<UserDeletedSubscriptionData>(USER_DELETED_SUBSCRIPTION);
  console.log('data', data?.users?.data);
  const [createCustomer] = useMutation(CREATE_CUSTOMER);
  const [updateCustomer] = useMutation(UPDATE_CUSTOMER);
  const [deleteCustomer] = useMutation(DELETE_CUSTOMER);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<User | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dataa, setdata] = useState<any>();
  const [fonts, setFonts] = React.useState([
    { id: 'helena', name: 'Helena', stylesCount: 7, inProd: false },
    { id: 'helvetica', name: 'Helvetica', stylesCount: 4, inProd: false },
    // ...more fonts
  ]);
  useEffect(() => {
    if (subscriptionData?.userUpdated || userDeletedData?.userDeleted) {
      refetch();
      setdata(data?.users?.data);
    }
  }, [userDeletedData, refetch]);

  const handleOpenSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleOpenDialog = (customer?: User) => {
    if (customer) {
      setEditingCustomer(customer);
      setFormData({ name: customer.name, email: customer.email });
    } else {
      setEditingCustomer(null);
      setFormData({ name: '', email: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      if (editingCustomer) {
        await updateCustomer({
          variables: { id: editingCustomer.id, ...formData },
        });
      } else {
        await createCustomer({ variables: formData });
      }
      setOpenDialog(false);
      refetch();
    } catch (err) {
      console.error('Error saving customer:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      try {
        await deleteCustomer({ variables: { id } });
        refetch();
      } catch (err) {
        console.error('Failed to delete customer:', err);
      }
    }
  };

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const customer = data?.users?.data[index];
    console.log('customer', customer);
    if (!customer) return null;

    return (
      <Box
        style={style}
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px 16px',
          borderBottom: '1px solid #eee',
        }}
      >
        <div style={{ flexBasis: '10%' }}>{dataa}</div>
      </Box>
    );
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" variant="h6" align="center" mt={4}>
        Error loading customers.
      </Typography>
    );

  const toggleFontInProd = (id: string) => {
    setFonts((prevFonts) =>
      prevFonts.map((font) =>
        font.id === id ? { ...font, inProd: !font.inProd } : font
      )
    );
  };

  return (
    <Box p={4}>
      <Typography
        gutterBottom
        sx={{
          fontWeight: '700',
          fontSize: '14px',
          textAlign: 'left',
          cursor: 'pointer',
        }}
        onClick={handleOpenSidebar}
      >
        Add New Production Font
      </Typography>

      <Licensedashboard />

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }} mb={2}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'semibold' }}>
          Customer List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
        >
          Add Customer
        </Button>
      </Box>

      <Box
        sx={{
          border: '1px solid rgba(224, 224, 224, 1)',
          borderRadius: 1,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            padding: '8px 16px',
            fontWeight: 'bold',
          }}
        >
          <div style={{ flexBasis: '10%' }}>ID</div>
          <div style={{ flexBasis: '30%' }}>Username</div>
          <div style={{ flexBasis: '40%' }}>Email</div>
          <div style={{ flexBasis: '20%' }}>Actions</div>
        </Box>

        {data?.users?.data?.length ? (
          <Box sx={{ height: 400 }}>
            {/* <AutoSizer>
              {({ height, width }) => (
                <FixedSizeList
                  height={height}
                  width={width}
                  itemSize={50}
                  itemCount={data?.users?.data?.length}
                  itemData={data}
                  itemKey={(index, data) => data.users.data[index].id}
                >
                  {Row}
                </FixedSizeList>
              )}
            </AutoSizer> */}
          </Box>
        ) : (
          <Typography align="center" sx={{ p: 2 }}>
            No customers found.
          </Typography>
        )}
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {editingCustomer ? 'Edit Customer' : 'Add Customer'}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {sidebarOpen && (
        <SideBarComponent
          handleOpenSidebar={handleOpenSidebar}
          fonts={fonts}
          toggleFontInProd={toggleFontInProd}
        />
      )}
    </Box>
  );
};

export default CustomerPage;
