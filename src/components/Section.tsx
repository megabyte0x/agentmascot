import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
};

export function Section({ children, className = "", id, labelledBy }: SectionProps) {
  return (
    <section id={id} className={`section ${className}`} aria-labelledby={labelledBy} data-reveal>
      <div className="section__inner">{children}</div>
    </section>
  );
}
