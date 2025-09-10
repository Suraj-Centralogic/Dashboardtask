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
  const template = ` <div style="font-family: 'Times New Roman', Times, serif; font-size: 11pt; padding: 30px; border: 1px solid #ddd; max-width: 800px; margin: auto; background-color: #ffffff; line-height: 1.6; color: #333;">
        <h2 style="font-family: Arial, sans-serif; font-size: 18pt; color: #2E3B55; text-align: center; margin-bottom: 20px;">REFERRAL AGREEMENT</h2>

        <p style="margin-bottom: 15px;">
            This Referral Agreement ("Agreement") is made on <strong style="border-bottom: 1px solid #000; padding: 0 40px; font-weight: normal;">{EffectiveDate}</strong>, by and between <strong style="border-bottom: 1px solid #000; padding: 0 80px; font-weight: normal;">{AgentName}</strong>, hereinafter referred to as "Agent", and License Park Realty, LLC or Referral Solutions, Inc., hereinafter referred to and doing business as "Realty Connect" for the referral client referred by the Agent.
        </p>
        
        <h3 style="font-family: Arial, sans-serif; font-size: 12pt; color: #2E3B55; border-bottom: 2px solid #2E3B55; padding-bottom: 5px; margin-top: 25px; margin-bottom: 10px;">DEFINITION OF A REFERRAL</h3>
        <p style="margin-bottom: 15px;">
            Realty Connect agents make referrals of buyers and sellers of their real estate ("Clients") to a real estate agent who can best serve their needs. A "Referral" is defined as when Realty Connect has recommended the Agent to the Client. Realty Connect will notify the Agent of the Referral through the Realty Connect system and via email.
        </p>

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

        <h3 style="font-family: Arial, sans-serif; font-size: 12pt; color: #2E3B55; border-bottom: 2px solid #2E3B55; padding-bottom: 5px; margin-top: 25px; margin-bottom: 10px;">FINE PRINT AND OTHER DETAILS</h3>
        <ul style="list-style-type: disc; padding-left: 20px; margin-bottom: 15px;">
            <li style="margin-bottom: 5px;">The Agent is responsible for the real estate brokerage services provided to the Clients. The Agent agrees to indemnify and hold Realty Connect harmless from any claims, costs, and damages incurred by Realty Connect arising from claims by Clients regarding the brokerage services provided by the Agent.</li>
            <li style="margin-bottom: 5px;">The Agent is responsible for maintaining his or her real estate license and for following all applicable real estate laws regarding disclosures, documentation, and other broker responsibilities.</li>
            <li style="margin-bottom: 5px;">In the unlikely event of a legal dispute between Realty Connect and the Agent, the prevailing party will be entitled to recover its attorneys' fees and costs from the other party.</li>
            <li style="margin-bottom: 5px;">This Agreement will be governed by state laws, without regard to its conflict of law's provisions.</li>
            <li style="margin-bottom: 5px;">Any notices between Realty Connect and the Agent are to be sent to the email addresses below. The agent is responsible for notifying Realty Connect if their email address changes.</li>
            <li style="margin-bottom: 5px;">No clients wanting to buy or sell properties under $100,000 are permitted into the network. Agents who submit referrals into the network that result in a settlement price under $100,000 will forfeit any referral commission owed. Likewise, no clients wanting to lease or rent real estate are permitted into the network either. If you have a client who wants to buy/sell real estate under $100,000 or rent/lease a property, the ONLY option you have as a Realty Connect agent is to "Choose Your Own Agent".</li>
        </ul>

        <div style="margin-top: 40px; display: flex; justify-content: space-between;">
            <div style="flex: 1; margin-right: 20px;">
                <p style="margin-bottom: 0;">BY:</p>
                <div style="border-bottom: 1px solid #000; height: 1px; width: 100%; margin-top: 50px;"></div>
                <p style="text-align: center; margin-top: 5px; font-size: 10pt; text-transform: uppercase;">AGENT</p>
                <p style="font-size: 10pt; margin-top: 20px; margin-bottom: 10px;">DATE: <span style="border-bottom: 1px solid #000; padding: 0 40px; display: inline-block;"></span></p>
                <p style="font-size: 10pt; margin-top: 10px;">EMAIL: <span style="border-bottom: 1px solid #000; padding: 0 40px; display: inline-block;"></span></p>
            </div>
            <div style="flex: 1; margin-left: 20px;">
                <p style="margin-bottom: 0;">BY:</p>
                <div style="border-bottom: 1px solid #000; height: 1px; width: 100%; margin-top: 50px;"></div>
                <p style="text-align: center; margin-top: 5px; font-size: 10pt;">Dana Jensen</p>
                <p style="font-size: 10pt; margin-top: 20px; margin-bottom: 10px;">DATE: <span style="border-bottom: 1px solid #000; padding: 0 40px; display: inline-block;"></span></p>
                <p style="font-size: 10pt; margin-top: 10px;">EMAIL: <span style="border-bottom: 1px solid #000; padding: 0 40px; display: inline-block;"></span></p>
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
}
