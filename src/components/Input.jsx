const Input = (props) => {
  const { placeholderText, value, onChange } = props;
  return (
    <div className="flex flex-col items-start border m-2 rounded-lg">
      <p className="w-full px-2 text-gray-500 font-medium text-sm">
        {placeholderText}
      </p>
      <input
        className="w-full px-2 font-medium text-lg focus:outline-none"
        onChange={onChange()} defaultValue={value}
      />
    </div>
  );
};

export default Input;
