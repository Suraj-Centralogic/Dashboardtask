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
 <div style="padding: 20px; margin: auto; line-height: 1.6;">

<table style="width: 100%; border-collapse: collapse;">
  <tbody>
    <tr>
      <td style="padding: 8px; width: 50%; text-align: left;">
        <div class="left" style="font-weight: 700;">
              REFERRAL AGREEMENT
            </div>
      </td>

      <td style="text-align: rigth;">
       <div class="text-align: rigth">
              <img src="/logo1.png" alt="Logo" style="height:50px;" />
            </div>
      </td>
    </tr>
  </tbody>
</table>

  <!-- Agreement Intro -->
  <p style="text-align: justify;">
    This Referral Agreement ("Agreement") is made on 
    <span style="font-weight: bold;">{EffectiveDate}</span>, by and between 
    <span style="font-weight: bold;">{AgentName}</span>, hereinafter referred to as "Agent", and 
    License Park Realty, LLC or Referral Solutions, Inc., hereinafter referred to and doing business as 
    "Realty Connect" for the referral client 
    <span style="font-weight: bold;">{ClientName}</span>.
  </p>

  <!-- Definition of Referral -->
  <h3 style="font-size: 13pt; margin-top: 20px;">DEFINITION OF A REFERRAL</h3>
  <p style="text-align: justify;">
    Realty Connect agents make referrals of buyers and sellers of real estate ("Clients") to a real estate agent who can best serve their needs. A "Referral" is defined as when Realty Connect has recommended the Agent to the Client. Realty Connect will notify the Agent of the Referral through the Realty Connect system and via email.
  </p>

  <!-- Voluntary Participation -->
  <h3 style="font-size: 13pt; margin-top: 20px;">VOLUNTARY PARTICIPATION</h3>
  <p style="text-align: justify;">
    The Agent's participation in Realty Connect's referral program is voluntary and can be terminated by either party at any time with written notice. However, any referrals made prior to such termination are still bound by this agreement, and referral fees will be due upon closing of any transactions resulting from such referrals.
  </p>

  <!-- Referral Fee -->
  <h3 style="font-size: 13pt; margin-top: 20px;">REFERRAL FEE</h3>
  <ul style="margin-left: 20px;">
    <li>A referral fee is triggered when a transaction closes within two years of the date of the referral.</li>
    <li>The referral fee to Realty Connect shall be <strong>{ReferralFee}%</strong> of the receiving Agent's side of the total Gross Commission Income (GCI).</li>
    <li>If an Agent represents a client referred by Realty Connect in multiple transactions, the same referral fee applies unless otherwise agreed.</li>
    <li>GCI is calculated as the total amount received by the Agent's broker before any split of commission.</li>
    <li>The referral fee must be paid to Realty Connect within 10 business days of closing.</li>
  </ul>

  <!-- Fine Print -->
  <h3 style="font-size: 13pt; margin-top: 20px;">FINE PRINT AND OTHER DETAILS</h3>
  <p style="text-align: justify;">
    The Agent is responsible for maintaining their license and complying with all real estate laws. Realty Connect is not liable for claims made by clients regarding services provided by the Agent. This agreement is governed by state laws, and any legal disputes will be handled accordingly.
  </p>

</div>
`;

  const [openPdf, setOpenPdf] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);

  return (
    <Box sx={{ flex: 1, mt: 8, p: 4, overflowY: 'auto' }}>
      <Card sx={{ mx: 'auto' }}>
        <CardHeader title="REFERRAL AGREEMENT" sx={{ textAlign: 'center', backgroundColor: '#f0f0f0' }} />
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
              <DialogContent dividers sx={{ maxHeight: '90vh', overflowY: 'auto' }}>
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

            <Dialog open={openPdf} onClose={() => setOpenPdf(false)} maxWidth="md" fullWidth>
              <DialogTitle>Form</DialogTitle>
              <DialogContent dividers>
                <PdfGenerator template={template} />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenPdf(false)} variant="contained" color="primary">
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
