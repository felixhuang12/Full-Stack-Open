const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}! You are {props.age} years old!</p>
    </div>
  )
}

const App = () => {
  const now = new Date();
  const a = 10;
  const b = 20;
  const name = "Peter";
  const age = 10;
  return (
    <div>
      <p>Hello world, it is now {now.toString()}</p>
      <p>{a} plus {b} is {a+b}</p>
      <Hello name={name} age={age} />
    </div>
  )
}

export default App