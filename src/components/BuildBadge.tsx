export default function BuildBadge() {
  const formatted = new Date(__BUILD_TIME__).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short',
  });

  return (
    <div className="build-badge" title={__BUILD_TIME__}>
      built {formatted}
    </div>
  );
}
