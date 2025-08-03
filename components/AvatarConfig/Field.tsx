interface FieldProps {
  label: string;
  children: React.ReactNode;
  tooltip?: string;
}

export const Field = (props: FieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-primary-light text-sm font-medium">
        {props.label}
      </label>
      {props.children}
    </div>
  );
};
