interface DitherFieldProps {
  className?: string;
}

/** Decorative dither texture — CSS only, hidden from assistive tech. */
export default function DitherField({ className = "" }: DitherFieldProps) {
  return <div className={`dither-field ${className}`.trim()} aria-hidden="true" />;
}