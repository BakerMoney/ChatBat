import List from "./comps/list/List"
import Chat from "./comps/chat/Chat"
import Details from "./comps/details/Details"

const App = () => {
  return (
    <div className='container'>
      <List/>
      <Chat/>
      <Details/>
    </div>
  )
}

export default App