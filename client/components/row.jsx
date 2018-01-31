const Row = ({ object }) => (
  <div id="table-data">
    {Object.keys(object).map((key) => {
      return <div>{object[key]}</div>
    })}
  </div>
)