export function Input({ type = "text", value, onChange }) {
    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="border p-2 rounded w-full"
      />
    );
  }
  