export default function ErrorMsg({ title, message, onConfirm }) {
  return (
    <div className='error'>
      <h2>{title}</h2>
      <p>{message}</p>

      {/* Dismiss logic */}
      {onConfirm && (
        <div id='confirmation-actions'>
          <button onClick={onConfirm} className='button'>
            Okay
          </button>
        </div>
      )}
    </div>
  );
}
