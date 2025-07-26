import "./details.css"

const Details = () => {
    return(
        <div className="details">
            <div className="user">
                <img src="./avatar.png" />
                <h2>
                    Bybis
                </h2>
                <p>lorem ipsum</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat settings</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Privacy & help</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared photos</span>
                        <img src="./arrowDown.png" alt="" />
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://image.spreadshirtmedia.com/image-server/v1/compositions/T347A1PA4306PT17X27Y6D13015213W19877H29447/views/1,width=550,height=550,appearanceId=1,backgroundColor=FFFFFF,noPt=true/filthy-frank-ey-boss-womens-t-shirt.jpg" alt="" />
                                <span>boss.png</span>
                            </div>
                            <img className="icon" src="./download.png" alt="" />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://image.spreadshirtmedia.com/image-server/v1/compositions/T347A1PA4306PT17X27Y6D13015213W19877H29447/views/1,width=550,height=550,appearanceId=1,backgroundColor=FFFFFF,noPt=true/filthy-frank-ey-boss-womens-t-shirt.jpg" alt="" />
                                <span>boss.png</span>
                            </div>
                            <img className="icon" src="./download.png" alt="" />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://image.spreadshirtmedia.com/image-server/v1/compositions/T347A1PA4306PT17X27Y6D13015213W19877H29447/views/1,width=550,height=550,appearanceId=1,backgroundColor=FFFFFF,noPt=true/filthy-frank-ey-boss-womens-t-shirt.jpg" alt="" />
                                <span>boss.png</span>
                            </div>
                            <img className="icon" src="./download.png" alt="" />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://image.spreadshirtmedia.com/image-server/v1/compositions/T347A1PA4306PT17X27Y6D13015213W19877H29447/views/1,width=550,height=550,appearanceId=1,backgroundColor=FFFFFF,noPt=true/filthy-frank-ey-boss-womens-t-shirt.jpg" alt="" />
                                <span>boss.png</span>
                            </div>
                            <img className="icon" src="./download.png" alt="" />
                        </div>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared files</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <button>Block</button>
                <button className="logout">Log out</button>
            </div>
        </div>
    )
    
}

export default Details