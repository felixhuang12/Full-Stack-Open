import Header from './Header'
import Content from './Content'

const Course = ({course}) => {
    const parts = course.parts
    return(
      <div>
        <Header course={course.name} />
        <Content parts={parts} />
      </div>
    )
}

export default Course