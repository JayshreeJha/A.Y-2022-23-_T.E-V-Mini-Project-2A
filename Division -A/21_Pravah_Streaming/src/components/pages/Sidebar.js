import React from 'react';
import '../../App.css';
import '../PagesCss/Sidebar.css'
import home from '../pngfiles/home.png'
import trend from '../pngfiles/trend.png'
import save from '../pngfiles/save.png'
import music from '../pngfiles/music.png'
import history from '../pngfiles/history.png'
import user from '../pngfiles/profile.png'
import { useNavigate } from 'react-router-dom'



export default function Sidebar() {
  const navigate = useNavigate()

  return(

    <div>


    <div className="sidebar">
      <div className="primary">

        <button className="button Home" data-application="Home" title="Home" onClick={() => navigate("/searchbar")} ><img src={home} alt="home" width={40}  />



        </button>
        <button className="button taxonomy" title="Trending" >
          <img src={trend} alt="trending" width={40} />
          
        </button>
        <button className="button directory" title="Saved" >
          <img src={save} alt="save" width={40} />
        </button>
        <button className="button contracts" title="Music" onClick={() => navigate("/music")}>
          <img src={music} alt="Music" width={40} />
               </button>
        <button className="button brevity" title="History" onClick={() => navigate("/history")}>
          <img src={history} alt="history" width={40} />
        </button>

        <header className="global-header">
          <div className="wrapper">
            <button className="button user" title="Profile" onClick={() => navigate("/userprofile")}><img src={user} alt="Profile" width={40} /></button>
          </div>
        </header>
      </div>

    </div>

  </div>

  );
}
