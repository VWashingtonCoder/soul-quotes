type ErrorsProps = {
  errors: [string, string][];
};

const ErrorsContainer = ({ errors }: ErrorsProps) => {
  return (
    <div className="errors-container">
      <p className="errors-title">Please fix errors to continue:</p>
      <ul className="errors-list">
        {errors.map((error) => (
          <li className="error" key={error[0]}>
            {error[1]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorsContainer;
