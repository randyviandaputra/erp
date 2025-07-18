interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = ({ label, ...props }: InputProps) => (
  <div className="flex flex-col gap-1 mb-3">
    {label && <label className="text-sm font-medium">{label}</label>}
    <input {...props} className="p-2 border rounded w-full" />
  </div>
);

export default Input;
