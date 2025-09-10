import { Card, CardContent, CardHeader, Button, Box } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomTextField from './CustomTextField';

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
      const template = localStorage.getItem('emailTemplate');

      if (!template) {
        console.error('No template found in localStorage');
        return;
      }

      try {
        const filledTemplate = template
          .replace(/{ClientName}/g, values.ClientName)
          .replace(/{EffectiveDate}/g, values.EffectiveDate)
          .replace(/{AgentName}/g, values.AgentName)
          .replace(/{ReferralFee}/g, values.ReferralFee);

        const tempElement = document.createElement('div');
        tempElement.innerHTML = filledTemplate;
        tempElement.style.position = 'absolute';
        tempElement.style.left = '-9999px';
        tempElement.style.width = '800px';
        tempElement.style.boxSizing = 'border-box';
        document.body.appendChild(tempElement);

        const canvas = await html2canvas(tempElement, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = 210;
        const pdfHeight = 297;
        const padding = 10;
        const imgWidth = pdfWidth - 2 * padding;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // Add the first page of the PDF
        pdf.addImage(imgData, 'PNG', padding, padding, imgWidth, imgHeight);
        heightLeft -= pdfHeight - 2 * padding;
        position = -(pdfHeight - 2 * padding);

        // Add subsequent pages if needed
        while (heightLeft > 0) {
          pdf.addPage();
          pdf.addImage(
            imgData,
            'PNG',
            padding,
            position + padding,
            imgWidth,
            imgHeight
          );
          heightLeft -= pdfHeight - 2 * padding;
          position -= pdfHeight - 2 * padding;
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
}
