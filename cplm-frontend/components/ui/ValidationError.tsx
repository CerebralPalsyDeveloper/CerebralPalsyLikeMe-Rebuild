import { Box } from "@mui/material";

interface ValidationErrorProps {
  message?: string;
}

export const ValidationError: React.FC<ValidationErrorProps> = ({
  message,
}) => {
  return <span style={{ minHeight: 20 }}>{message}</span>;
};
