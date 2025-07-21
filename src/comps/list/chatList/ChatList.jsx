import "./chatList.css"

const ChatList = () => {
    return(
        <div className="chatList">
            <div className="search">
                <div className="searchBar">
                   <img src="./search.png" alt=""/>
                   <input type="text" placeholder="Search user.." /> 
                </div>
                <img src="./plus.png" alt="" className="add" />
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>bybis2</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>bybis2</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>bybis2</span>
                    <p>Hello</p>
                </div>
            </div>
        </div>
    )
    
}

export default ChatList