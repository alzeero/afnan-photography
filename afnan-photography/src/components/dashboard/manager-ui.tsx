/** Small shared pieces for the dashboard panels. */

export function ManagerHeading({ title, description }: { title: string; description?: string }) {
  return (
    <div>
      <h2 className="font-display text-heading text-on-surface">{title}</h2>
      {description && <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-on-surface-mute">{description}</p>}
    </div>
  );
}

/** Square icon-only action button (reorder, edit, delete). */
export const iconButton =
  "rounded-[3px] p-2.5 text-on-surface-mute transition-colors duration-300 hover:bg-line/[0.06] hover:text-on-surface disabled:pointer-events-none disabled:opacity-30";
