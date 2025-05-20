function TextInput({ type, id, name, onChange, value, placeholder }) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export default TextInput;
