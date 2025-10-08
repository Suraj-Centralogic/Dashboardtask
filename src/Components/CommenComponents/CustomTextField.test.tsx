import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import { Formik, Form } from 'formik';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CustomTextField from './CustomTextField';
import '@testing-library/jest-dom';

interface FormValues {
  username: string;
}

const theme = createTheme();

const renderWithFormik = (
  props?: Partial<FormValues>,
  touched?: any,
  errors?: any
) => {
  const initialValues: FormValues = { username: '', ...props };

  return render(
    <ThemeProvider theme={theme}>
      <Formik initialValues={initialValues} onSubmit={vi.fn()}>
        {(formik) => (
          <Form>
            <CustomTextField<FormValues>
              name="username"
              label="Username"
              formik={{
                ...formik,
                touched: touched || {},
                errors: errors || {},
              }}
              startAdornment={<span data-testid="start-adornment">S</span>}
              endAdornment={<span data-testid="end-adornment">E</span>}
            >
              <span data-testid="child-element">Child</span>
            </CustomTextField>
          </Form>
        )}
      </Formik>
    </ThemeProvider>
  );
};

describe('<CustomTextField />', () => {
  test('renders with label and initial value', () => {
    renderWithFormik({ username: 'JohnDoe' });
    const input = screen.getByLabelText(/username/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('JohnDoe');
  });

  test('calls handleChange when user types', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <ThemeProvider theme={theme}>
        <Formik initialValues={{ username: '' }} onSubmit={vi.fn()}>
          {(formik) => (
            <Form>
              <CustomTextField<FormValues>
                name="username"
                label="Username"
                formik={{ ...formik, handleChange }}
              />
            </Form>
          )}
        </Formik>
      </ThemeProvider>
    );

    const input = screen.getByLabelText(/username/i);
    await user.type(input, 'Hello');
    expect(handleChange).toHaveBeenCalledTimes(5);
  });

  test('shows error message when field is touched and has error', () => {
    renderWithFormik({}, { username: true }, { username: 'Required field' });
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  test('renders startAdornment and endAdornment', () => {
    renderWithFormik();
    expect(screen.getByTestId('start-adornment')).toBeInTheDocument();
    expect(screen.getByTestId('end-adornment')).toBeInTheDocument();
  });
});
