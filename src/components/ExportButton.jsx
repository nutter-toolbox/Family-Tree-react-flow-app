import PropTypes from 'prop-types';

ExportButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default function ExportButton({ onClick}) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        padding: '10px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      Export as Image
    </button>
  );
}
