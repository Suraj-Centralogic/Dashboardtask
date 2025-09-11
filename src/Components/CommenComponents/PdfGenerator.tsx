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
        tempElement.style.position = 'fixed';
        tempElement.style.top = '0';
        tempElement.style.left = '0';
        tempElement.style.width = `${mmToPx(210)}px`;
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
        pdf.setDrawColor(66, 54, 54);
        pdf.setLineWidth(0.5);
        pdf.rect(5, 5, pdfWidth - 10, pdfHeight - 10);
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
