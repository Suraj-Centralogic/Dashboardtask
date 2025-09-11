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

export default function HomePage() {
  const template = `<div style="font-family: 'Times New Roman', Times, serif; font-size: 11pt; padding: 30px; border: 1px solid #ddd; max-width: 800px; margin: auto; background-color: #ffffff; line-height: 1.6; color: #333;">
        <h2 style="font-family: Arial, sans-serif; font-size: 18pt; color: #2E3B55; text-align: center; margin-bottom: 20px;">REFERRAL AGREEMENT</h2>
      <div style="display: flex; flex-wrap: wrap;">
  This Referral Agreement ("Agreement") is made on 
  <span>{EffectiveDate}</span>, by and between 
  <span>{AgentName}</span>, hereinafter referred to as "Agent", and 
  License Park Realty, LLC or Referral Solutions, hereinafter referred to and doing business as 
  "Realty Connect" for the referral client referred by 
  <span>{ClientName}</span>.
</div>
        <h3 style="font-family: Arial, sans-serif; font-size: 12pt; color: #2E3B55; border-bottom: 2px solid #2E3B55; padding-bottom: 5px; margin-top: 25px; margin-bottom: 10px;">DEFINITION OF A REFERRAL</h3>
        <p style="margin-bottom: 15px;">
            Realty Connect agents make referrals of buyers and sellers of their real estate ("Clients") to a real estate agent who can best serve their needs. A "Referral" is defined as when Realty Connect has recommended the Agent to the Client. Realty Connect will notify the Agent of the Referral through the Realty Connect system and via email.
        </p>
            <strong style="border-bottom: 1px solid #000; padding: 0 40px; font-weight: normal;">for the referral client: {ClientName}</strong>.
        <h3 style="font-family: Arial, sans-serif; font-size: 12pt; color: #2E3B55; border-bottom: 2px solid #2E3B55; padding-bottom: 5px; margin-top: 25px; margin-bottom: 10px;">VOLUNTARY PARTICIPATION</h3>
        <p style="margin-bottom: 15px;">
            The Agent's participation in Realty Connect's referral program is voluntary and can be terminated by either party at any time with written notice. However, any Referrals made prior to such termination are still bound by this agreement, and referral fees will be due upon closing of any transactions resulting from such referrals.
        </p>
 
        <h3 style="font-family: Arial, sans-serif; font-size: 12pt; color: #2E3B55; border-bottom: 2px solid #2E3B55; padding-bottom: 5px; margin-top: 25px; margin-bottom: 10px;">REFERRAL FEE</h3>
        <p style="margin-bottom: 10px;">For referrals made, the Agent agrees to pay Realty Connect a referral fee through the Agent's employing broker as follows:</p>
        <ul style="list-style-type: disc; padding-left: 20px; margin-bottom: 15px;">
            <li style="margin-bottom: 5px;">A referral fee is triggered when a transaction closes within two years of the date of the Referral.</li>
            <li style="margin-bottom: 5px;">The referral fee to Realty Connect shall be <strong style="color: #2E3B55; border-bottom: 1px solid #000; font-weight: normal;">{ReferralFee}</strong> of the receiving Agent's side of the total Gross Commission income (GCI) prior to any splits or concessions.</li>
            <li style="margin-bottom: 5px;">If an Agent represents a client referred by Realty Connect in multiple transactions, a <strong style="color: #2E3B55; border-bottom: 1px solid #000; font-weight: normal;">{ReferralFee}</strong> referral fee will apply to those additional transactions unless otherwise agreed to by Realty Connect and the Agent.</li>
            <li style="margin-bottom: 5px;">Gross Commission Income (GCI) is calculated on the total amount received by the Agent's broker prior to any split of commission with the agent or any other brokers on the Agent's side of the transaction.</li>
            <li style="margin-bottom: 5px;">Upon execution of a contract for a transaction involving a Referral, the Agent will promptly update the referral in the Realty Connect System and indicate the anticipated Closing date.</li>
            <li style="margin-bottom: 5px;">The receiving Agent will have the resulting referral fee paid by their employing broker to Realty Connect within 10 business days of close of escrow.</li>
        </ul>
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
}
