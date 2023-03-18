export default function Select({id, label, options}) {
  return (
    <>
      {
        !!label &&
        <label htmlFor={id}>{ label }</label>
      }
      <div id={id}>
        {
          !!options &&
          options.map(option => {
            return (
              <option>{ option }</option>
            )
          })
        }
      </div>
    </>
  )
}