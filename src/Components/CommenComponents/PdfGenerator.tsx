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
      try {
        const template = localStorage.getItem('emailTemplate');
        if (!template) {
          console.error('No email template found in local storage.');
          return;
        }
        const filledTemplate = template
          .replace(/{ClientName}/g, values.ClientName || '')
          .replace(/{EffectiveDate}/g, values.EffectiveDate || '')
          .replace(/{AgentName}/g, values.AgentName || '')
          .replace(/{ReferralFee}/g, values.ReferralFee || '');

        const tempElement = document.createElement('div');
        tempElement.innerHTML = filledTemplate;
        tempElement.style.position = 'absolute';
        tempElement.style.left = '-9999px'; // Position off-screen
        tempElement.style.width = '800px';
        tempElement.style.boxSizing = 'border-box';
        // Add padding to the temporary element itself
        tempElement.style.padding = '20mm 10mm';
        document.body.appendChild(tempElement);

        const canvas = await html2canvas(tempElement, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = 210;
        const pdfHeight = 297;
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // Add the first page
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        // Add subsequent pages if needed
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
