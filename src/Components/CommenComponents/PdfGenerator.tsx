import { Card, CardContent, CardHeader, Button, Box } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomTextField from './CustomTextField';

const PdfGenerator = () => {
  const formik = useFormik({
    initialValues: {
      ClientName: '',
      EffectiveDate: '',
      AgentName: '',
      ReferralFee: '',
    },
    validationSchema: Yup.object({
      ClientName: Yup.string().required('Client Name is required'),
      EffectiveDate: Yup.string().required('Effective Date is required'),
      AgentName: Yup.string().required('Agent Name is required'),
      ReferralFee: Yup.string().required('Referral Fee is required'),
    }),
    onSubmit: async (values) => {
      const mmToPx = (mm: any) => Math.round(mm * (96 / 25.4));
      try {
        const template = localStorage.getItem('emailTemplate');
        if (!template) {
          console.error('No email template found in local storage.');
          alert('First save data in Local storage or Edit first ');
          return;
        }
        const filledTemplate = template
          .replace(/{ClientName}/g, values.ClientName || '')
          .replace(/{EffectiveDate}/g, values.EffectiveDate || '')
          .replace(/{AgentName}/g, values.AgentName || '')
          .replace(/{ReferralFee}/g, values.ReferralFee || '');
        const tempElement = document.createElement('div');

        tempElement.innerHTML = `
      <style>
        .pdf-root {
          color: #000000;
            line-height: 1.2; 
      letter-spacing: 0.2px; /* Reduce word spacing */
        }
        h1, h2, h3, h4, h5, h6 {
          color: #000000;
          margin-top: 2;
        }
        strong { font-weight: bold; }
        u { text-decoration: underline; }
        s { text-decoration: line-through; }
        p { margin: 0 0 10px 0; color: #000000; }
        .ql-align-center { text-align: center; }
        body, .pdf-root {
          background-color: #ffffff;
          padding-left: 4px;  
          padding-right: 4px;
          margin: 10px;
        }
    .side-by-side {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .side-by-side .left, .side-by-side .right {
      width: 50%;
    }
    .side-by-side .right {
      text-align: right;
    }
      </style>
      <div class="pdf-root">
        ${filledTemplate}
        <table style="width: 100%; border-collapse: collapse;">
          <tbody>
            <tr>
              <!-- AGENT COLUMN -->
              <td style="width: 50%;; padding: 8px; vertical-align: top;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tbody>
                    <tr>
                     <div>
                      <span style="padding: 8px;">BY:</span>
                      
                        <img src="/sign1.png" alt="Broker Signature" style="height: 40px;" />
                      </div>
                      <p style="padding: 8px;"><strong>AGENT - {AgentName}</strong></p>
                      <p style="padding: 8px;">DATE: <strong>{EffectiveDate}</strong></p>
                      <p style="padding: 8px;">EMAIL: <strong>{AgentEmail}</strong></p>
                    </tr>
                  </tbody>
                </table>  
              </td>
        
              <!-- BROKER COLUMN -->
              <td style="width: 50%; padding: 8px; vertical-align: top;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tbody>
                    <tr>
                      <div>
                      <span style="padding: 8px;">BY:</span>
                      
                        <img src="/sign2.png" alt="Broker Signature" style="height: 40px;" />
                      
                      </div>
                      <p style="padding: 8px;">
                        <strong>Dana Jensen – Principal Broker, Realty Connect</strong>
                      </p>
                      <p style="padding: 8px;">DATE: <strong>{EffectiveDate}</strong></p>
                      <p style="padding: 8px;">EMAIL: <strong>admin@realtyconnect.com</strong></p>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        

          <!-- Footer -->
  <div style="border-top: 1px solid #000; margin-top: 20px; padding-top: 10px; text-align: center; font-size: 9pt;">
    <p style="text-align: center;">Realty Connect | 123 Main Street, City, State, ZIP | www.realtyconnect.com</p>
    <p style="text-align: center;">&copy; {CurrentYear} Realty Connect. All Rights Reserved.</p>
  </div>
      </div>
    `;
        tempElement.style.position = 'fixed';
        tempElement.style.top = '0';
        tempElement.style.left = '0';
        tempElement.style.width = `${mmToPx(210)}px`; // A4 width
        document.body.appendChild(tempElement);

        // Wait for fonts
        if (document.fonts) {
          await document.fonts.ready;
        }

        // Render HTML to canvas
        const canvas = await html2canvas(tempElement, {
          scale: window.devicePixelRatio || 2,
          useCORS: true,
          allowTaint: false,
        });

        // Clean up temp element
        document.body.removeChild(tempElement);

        // Create PDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Define padding for inside the border (in mm)
        const padding = 4;

        const imgWidth = pdfWidth - padding * 2; // reduce width by padding
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Convert height from px to mm
        const pxFullHeight = canvas.height;
        const pxPerMm = canvas.height / imgHeight;
        const pageHeightPx = (pdfHeight - padding * 2) * pxPerMm; // reduce height by padding

        let renderedHeight = 0;

        while (renderedHeight < pxFullHeight) {
          const pageCanvas = document.createElement('canvas');
          pageCanvas.width = canvas.width;
          pageCanvas.height = Math.min(
            pageHeightPx,
            pxFullHeight - renderedHeight
          );

          const ctx = pageCanvas.getContext('2d');
          if (!ctx) {
            throw new Error('Failed to get 2D context from canvas.');
          }
          ctx.drawImage(
            canvas,
            0,
            renderedHeight,
            canvas.width,
            pageCanvas.height,
            0,
            0,
            canvas.width,
            pageCanvas.height
          );

          const pageData = pageCanvas.toDataURL('image/png');
          if (renderedHeight > 0) {
            pdf.addPage();
          }

          const pageImageHeight = (pageCanvas.height * imgWidth) / canvas.width;
          // Draw the image with padding offsets
          pdf.addImage(
            pageData,
            'PNG',
            padding,
            padding,
            imgWidth,
            pageImageHeight
          );

          // Draw border inside padding area
          pdf.setDrawColor(128, 128, 128); // black border
          pdf.setLineWidth(0.5);
          // const radius = 2;
          // pdf.roundedRect(
          //   padding,
          //   padding,
          //   pdfWidth - padding * 2,
          //   pdfHeight - padding * 2,
          //   radius,
          //   radius,
          //   'S'
          // );
          renderedHeight += pageHeightPx;
        }
        pdf.save('Referral_Agreement.pdf');
      } catch (err) {
        console.error('PDF generation error:', err);
      }
    },
  });

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto' }}>
      <CardHeader
        title="Fill Agreement Details"
        sx={{ textAlign: 'center', backgroundColor: '#f5f5f5' }}
      />
      <CardContent>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
          noValidate
          autoComplete="off"
        >
          <CustomTextField
            name="AgentName"
            label="Agent Name"
            formik={formik}
          />
          <CustomTextField
            name="ClientName"
            label="Client Name"
            formik={formik}
          />
          <CustomTextField
            name="EffectiveDate"
            label="Effective Date"
            formik={formik}
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          <CustomTextField
            name="ReferralFee"
            label="Referral Fee (%)"
            formik={formik}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!formik.isValid || !formik.dirty}
          >
            Generate PDF
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
export default PdfGenerator;
