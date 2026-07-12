import type { AnchorHTMLAttributes, ReactNode } from "react";
import { tallyUrl } from "../config";

type WaitlistLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: ReactNode;
};

function recordWaitlistClick() {
  window.dispatchEvent(new CustomEvent("mascot:waitlist-click"));
}

export function WaitlistLink({ children = "Join the waitlist", ...props }: WaitlistLinkProps) {
  if (!tallyUrl) {
    return (
      <span
        className={`button button--disabled ${props.className ?? ""}`}
        aria-disabled="true"
        title="The waitlist link is not configured yet."
      >
        {children}
      </span>
    );
  }

  return (
    <a
      {...props}
      className={`button ${props.className ?? ""}`}
      href={tallyUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Join The Mascot waitlist (opens in a new tab)"
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented) recordWaitlistClick();
      }}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
