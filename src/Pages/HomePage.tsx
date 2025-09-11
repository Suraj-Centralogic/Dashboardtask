import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from '@mui/material';
import EmailTemplateEditor from '../Components/CommenComponents/MuiTextEditor';
import PdfGenerator from '../Components/CommenComponents/PdfGenerator';

const HomePage = () => {
  const template = `
<div style="font-family: 'Times New Roman', Times, serif; font-size: 11pt; padding: 30px; border: 1px solid #000; max-width: 800px; margin: auto; background-color: #ffffff; line-height: 1.6; color: #000;">
  
  <!-- Title Section -->
  <h2 style="font-family: Arial, sans-serif; font-size: 16pt; color: #000; text-align: center; margin: 0; padding: 10px 0; background-color: #000; color: #fff;">
    REFERRAL AGREEMENT
  </h2>

  <!-- Agreement Intro -->
  <p style="margin-top: 20px; margin-bottom: 15px; text-align: justify;">
    This Referral Agreement ("Agreement") is made on 
    <span style="font-weight: bold;">{EffectiveDate}</span>, by and between 
    <span style="font-weight: bold;">{AgentName}</span>, hereinafter referred to as "Agent", and 
    License Park Realty, LLC or Referral Solutions, Inc., hereinafter referred to and doing business as 
    "Realty Connect" for the referral client referred by 
    <span style="font-weight: bold;">{ClientName}</span>.
  </p>

  <!-- Definition Section -->
  <h3 style="font-family: Arial, sans-serif; font-size: 12pt; color: #000; margin-top: 25px; margin-bottom: 10px; border-bottom: 2px solid #000; padding-bottom: 5px;">
    DEFINITION OF A REFERRAL
  </h3>
  <p style="margin-bottom: 15px; text-align: justify;">
    Realty Connect agents make referrals of buyers and sellers of their real estate ("Clients") to a real estate agent who can best serve their needs. 
    A "Referral" is defined as when Realty Connect has recommended the Agent to the Client. Realty Connect will notify the Agent of the Referral 
    through the Realty Connect system and via email.
  </p>

  <!-- Voluntary Participation Section -->
  <h3 style="font-family: Arial, sans-serif; font-size: 12pt; color: #000; margin-top: 25px; margin-bottom: 10px; border-bottom: 2px solid #000; padding-bottom: 5px;">
    VOLUNTARY PARTICIPATION
  </h3>
  <p style="margin-bottom: 15px; text-align: justify;">
    The Agent’s participation in Realty Connect's referral program is voluntary and can be terminated by either party at any time with written notice. 
    However, any Referrals made prior to such termination are still bound by this agreement, and referral fees will be due upon closing of any 
    transactions resulting from such referrals.
  </p>

  <!-- Referral Fee Section -->
  <h3 style="font-family: Arial, sans-serif; font-size: 12pt; color: #000; margin-top: 25px; margin-bottom: 10px; border-bottom: 2px solid #000; padding-bottom: 5px;">
    REFERRAL FEE
  </h3>
  <p style="margin-bottom: 10px; text-align: justify;">
    For referrals made, the Agent agrees to pay Realty Connect a referral fee through the Agent's employing broker as follows:
  </p>
  <ul style="margin-left: 20px; padding-left: 15px; list-style-type: disc;">
    <li>A referral fee is triggered when a transaction closes within two years of the date of the Referral.</li>
    <li>The referral fee to Realty Connect shall be <span style="font-weight: bold;">{ReferralFee}%</span> of the receiving Agent’s side of total Gross Commission Income (GCI) prior to any splits or concessions.</li>
    <li>Upon execution of a contract, the Agent will promptly update the referral in the Realty Connect System with the anticipated closing date.</li>
    <li>The receiving Agent will ensure the referral fee is paid to Realty Connect within 10 business days of close of escrow.</li>
  </ul>

  <!-- Fine Print Section -->
  <h3 style="font-family: Arial, sans-serif; font-size: 12pt; color: #000; margin-top: 25px; margin-bottom: 10px; border-bottom: 2px solid #000; padding-bottom: 5px;">
    FINE PRINT AND OTHER DETAILS
  </h3>
  <ul style="margin-left: 20px; padding-left: 15px; list-style-type: disc;">
    <li>The Agent will maintain their license and comply with all state laws, documentation, and disclosure requirements.</li>
    <li>All notices between Realty Connect and the Agent must be sent to the email addresses listed below.</li>
    <li>Legal disputes will be resolved with the prevailing party entitled to recover attorney’s fees and costs.</li>
  </ul>

  <!-- Signature Section -->
<div style="margin-top: 20px; width: 100%; display: flex; justify-content: space-between;">
  <!-- Left Column -->
  <div style="width: 48%;">
    <p style="margin: 0 0 5px;">BY:</p>
    <p style="margin: 0 0 8px;">AGENT</p>
    <p style="margin: 0 0 5px;">DATE:</p>
    <p style="margin: 0;">EMAIL:</p>
  </div>
</div>
</div>
`;

  const [openPdf, setOpenPdf] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);

  return (
    <Box sx={{ flex: 1, mt: 8, p: 4, overflowY: 'auto' }}>
      <Card sx={{ mx: 'auto' }}>
        <CardHeader
          title="REFERRAL AGREEMENT"
          sx={{ textAlign: 'center', backgroundColor: '#f0f0f0' }}
        />
        <CardContent>
          <Typography color="textSecondary" mb={2}>
            Click the buttons below to open the editor or generate a PDF form.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Dialog
              open={openEditor}
              onClose={() => setOpenEditor(false)}
              PaperProps={{
                sx: {
                  width: '70%',
                  maxWidth: '90vw',
                  margin: 'auto',
                },
              }}
            >
              <DialogTitle>REFERRAL AGREEMENT</DialogTitle>
              <DialogContent
                dividers
                sx={{ maxHeight: '90vh', overflowY: 'auto' }}
              >
                <EmailTemplateEditor template={template} />
              </DialogContent>
              <DialogActions></DialogActions>
            </Dialog>
            <Button
              onClick={() => setOpenEditor(true)}
              sx={{
                bgcolor: 'black',
                color: 'white',
                '&:hover': { bgcolor: 'gray' },
                borderRadius: 2,
                fontWeight: 600,
              }}
            >
              Text Editor
            </Button>

            <Dialog
              open={openPdf}
              onClose={() => setOpenPdf(false)}
              maxWidth="md"
              fullWidth
            >
              <DialogTitle>Form</DialogTitle>
              <DialogContent dividers>
                <PdfGenerator template={template} />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setOpenPdf(false)}
                  variant="contained"
                  color="primary"
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>
            <Button
              onClick={() => setOpenPdf(true)}
              variant="outlined"
              sx={{
                borderColor: 'black',
                color: 'black',
                '&:hover': { bgcolor: 'black', color: 'white' },
                borderRadius: 2,
                fontWeight: 600,
              }}
            >
              Form Open
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
export default HomePage;
