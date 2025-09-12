import { Card, CardContent, CardHeader, Button, Box } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomTextField from './CustomTextField';

type PdfGeneratorProps = {
  template: string;
};

const PdfGenerator = ({}: PdfGeneratorProps) => {
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
          font-family: Arial, sans-serif;
          color: #000000;
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
      </style>
      <div class="pdf-root">
        ${filledTemplate}
      </div>
    `;
        tempElement.style.position = 'fixed';
        tempElement.style.top = '0';
        tempElement.style.left = '0';
        tempElement.style.width = `${mmToPx(210)}px`; // A4 width
        document.body.appendChild(tempElement);

        // Wait for fonts
        if (document.fonts && document.fonts.ready) {
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
        const padding = 10; // 10mm padding on all sides

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
          pageCanvas.height = Math.min(pageHeightPx, pxFullHeight - renderedHeight);

          const ctx = pageCanvas.getContext('2d');
          if (!ctx) {
            throw new Error('Failed to get 2D context from canvas.');
          }
          ctx.drawImage(canvas, 0, renderedHeight, canvas.width, pageCanvas.height, 0, 0, canvas.width, pageCanvas.height);

          const pageData = pageCanvas.toDataURL('image/png');
          if (renderedHeight > 0) {
            pdf.addPage();
          }

          const pageImageHeight = (pageCanvas.height * imgWidth) / canvas.width;
          // Draw the image with padding offsets
          pdf.addImage(pageData, 'PNG', padding, padding, imgWidth, pageImageHeight);

          // Draw border inside padding area
          pdf.setDrawColor(0, 0, 0); // black border
          pdf.setLineWidth(0.5);
          pdf.rect(padding, padding, pdfWidth - padding * 2, pdfHeight - padding * 2);

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
      <CardHeader title="Fill Agreement Details" sx={{ textAlign: 'center', backgroundColor: '#f5f5f5' }} />
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
          <CustomTextField name="AgentName" label="Agent Name" formik={formik} />
          <CustomTextField name="ClientName" label="Client Name" formik={formik} />
          <CustomTextField
            name="EffectiveDate"
            label="Effective Date"
            formik={formik}
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          <CustomTextField name="ReferralFee" label="Referral Fee (%)" formik={formik} />

          <Button type="submit" variant="contained" color="primary" fullWidth disabled={!formik.isValid || !formik.dirty}>
            Generate PDF
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
export default PdfGenerator;
