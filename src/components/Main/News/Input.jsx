

function Input(props) {
  const { placeholder, isEdit, editTitle, title, setEditTitle, setTitle } = props;
  return (
    <input
      required
      type="text"
      placeholder={placeholder}
      value={isEdit ? editTitle : title}
      onChange={(e) =>
        isEdit ? setEditTitle(e.target.value) : setTitle(e.target.value)
      }
    />
  )
}

export default Input;