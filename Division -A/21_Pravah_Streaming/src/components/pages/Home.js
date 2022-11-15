import React from 'react';
import '../../App.css';
import img from '../images/havana.png'
import '../PagesCss/Home.css'

export default function Home() {
  return (
    <>
    <div className='bg'>

    <video className='bgvideo' autoPlay loop muted>
            <source id="mp4" src='https://res.cloudinary.com/dsp4p9uyy/video/upload/v1667683314/DAM%20video%20tutorials/bgvideo_kyj5x3.mp4' type="video/mp4" />
          </video>
      <div className='cardp'>
        <div className="polaroid">
          <video className='havana' id="video"  preload="none" poster={img}>
            <source id="mp4" src='https://res.cloudinary.com/dsp4p9uyy/video/upload/v1664893412/EnglishSongs/Camila_Cabello___Havana_ACL_Festival_1080P_HD_pqoe9i.mp4' type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
    </>
  );
}
