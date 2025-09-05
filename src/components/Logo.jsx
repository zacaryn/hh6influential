import Link from 'next/link';

function Logo({ className = '', size = 'medium', clickable = true, onClick, showText = true }) {
  const LogoComponent = () => (
    <div className={`admin-logo admin-logo-${size} ${className}`}>
      <img
        src="/assets/icons/hh6logo.svg"
        alt="HH6 Logo"
        className="admin-logo-svg"
      />
      {showText && <span className="admin-logo-text">HH6 Influential</span>}
    </div>
  );

  if (clickable) {
    return (
      <Link href="/" onClick={onClick}>
        <LogoComponent />
      </Link>
    );
  }

  return <LogoComponent />;
}

export default Logo;
