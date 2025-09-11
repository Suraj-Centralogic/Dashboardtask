import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Box,
  TextField,
} from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useFormik } from 'formik';
import * as Yup from 'yup';

type PdfGeneratorProps = {
  template: string;
};

export default function PdfGenerator({}: PdfGeneratorProps) {
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
          return;
        }
        console.log(template);
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
          margin: 0;
        }
        strong { font-weight: bold; }
        u { text-decoration: underline; }
        s { text-decoration: line-through; }
        p { margin: 0 0 10px 0; color: #000000; }
        .ql-align-center { text-align: center; }
        /* Ensure white background so text is visible */
        body, .pdf-root {
          background-color: #ffffff;
           padding-left: 12px;  
           padding-right: 12px;
         border: 1px solid #423636ff;
         border-radius: 4px;  
         margin: 10px;
        }
      </style>
      <div class="pdf-root">
        ${filledTemplate}
      </div>
    `;

        // Position element but keep it rendered and invisible
        tempElement.style.position = 'fixed';
        tempElement.style.top = '0';
        tempElement.style.left = '0';
        tempElement.style.width = `${mmToPx(210)}px`; // A4 width

        document.body.appendChild(tempElement);
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }
        const canvas = await html2canvas(tempElement, {
          scale: window.devicePixelRatio || 2,
          useCORS: true,
          allowTaint: false,
          backgroundColor: '#ffffff',
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
        while (heightLeft > 0) {
          position = -(imgHeight - heightLeft);
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
        }
        pdf.save('Referral_Agreement.pdf');
        document.body.removeChild(tempElement);
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
          <TextField
            name="AgentName"
            label="Agent Name"
            value={formik.values.AgentName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.AgentName && Boolean(formik.errors.AgentName)}
            helperText={formik.touched.AgentName && formik.errors.AgentName}
            fullWidth
          />
          <TextField
            name="ClientName"
            label="Client Name"
            value={formik.values.ClientName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.ClientName && Boolean(formik.errors.ClientName)
            }
            helperText={formik.touched.ClientName && formik.errors.ClientName}
            fullWidth
          />
          <TextField
            name="EffectiveDate"
            label="Effective Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.EffectiveDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.EffectiveDate &&
              Boolean(formik.errors.EffectiveDate)
            }
            helperText={
              formik.touched.EffectiveDate && formik.errors.EffectiveDate
            }
            fullWidth
          />
          <TextField
            name="ReferralFee"
            label="Referral Fee (%)"
            value={formik.values.ReferralFee}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.ReferralFee && Boolean(formik.errors.ReferralFee)
            }
            helperText={formik.touched.ReferralFee && formik.errors.ReferralFee}
            fullWidth
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
}
