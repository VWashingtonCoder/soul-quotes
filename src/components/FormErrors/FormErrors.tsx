type FormErrorsProps = {
  errors: string[];
  formKey: string;
};

export default function FormErrors({ errors, formKey }: FormErrorsProps) {
  const errorMessage =
    formKey === "join"
      ? "There were errors with your submission:"
      : "Please fix the following errors:";
  return (
    <div className="error-container">
      <p className="error-message">{errorMessage}</p>
      <ul className="error-list">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  );
}
