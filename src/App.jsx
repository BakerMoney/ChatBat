import List from "./comps/list/List";
import Chat from "./comps/chat/Chat";
import Details from "./comps/details/Details";
import Login from "./comps/login/login";

const App = () => {

const user = false;

  return (
    <div className='container' style={!user ? { width: "60vw", height: "60vh" } : {}}>
      { user ? (      
          <>
            <List/>
            <Chat/>
            <Details/>
          </>
        ) : (<Login />)
      }

    </div>
  )
}

export default App;