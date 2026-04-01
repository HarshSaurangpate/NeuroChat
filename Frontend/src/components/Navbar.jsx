function Navbar({ setIsOpen }) {
  return (
    <div
      className="p-3 d-flex justify-content-between align-items-center"
      style={{
        backgroundColor: "#212121",
        color: "#fff",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }}
    >
      {/* Left Title */}
      <span className="fs-5">
        NeuroChat <i className="fa-solid fa-chevron-down"></i>
      </span>

      {/* Mobile Toggle Button */}
      <button
        className="btn btn-outline-light btn-sm d-md-none"
        onClick={() => setIsOpen(true)}
      >
        ☰
      </button>
    </div>
  );
}

export default Navbar;