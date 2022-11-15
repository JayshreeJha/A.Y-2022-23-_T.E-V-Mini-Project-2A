import '../PagesCss/Maindash.css'
import React, { useState, useEffect } from 'react'
import '../Button'
import Moviepage from './Moviepage'



const Maindash = ({ Moviedata }) => {

  //getting data for tongle z






  //last line
  const [page, setPage] = useState(false);
  const [currentData, setCurrent] = useState({});
  const tongle = (data) => {
    setCurrent(data);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { setPage(!page); }, [currentData])

  return (

    <>




      {page ?
        <div className='borderm'>


          <ul className="carddashs">

            {/* <div className='cardp' >
        <div className="polaroid" >
        <video className='havana' id="video"  preload="none" poster={img}>
        <source id="mp4" src='https://res.cloudinary.com/dsp4p9uyy/video/upload/v1664893412/EnglishSongs/Camila_Cabello___Havana_ACL_Festival_1080P_HD_pqoe9i.mp4' type="video/mp4" />
          </video>
          </div>
          </div>
        */}
        
            {Moviedata.map((i, k) => {
              return ( //{`${userdata.email} `}
                <>






                  <li key={k} className="carddashs__item">
             



                    <div>


                      <div className="card ">
                        <img src={i.image} className="card-img" alt="poster" />

                        <div className="card-body">
                          <h1 id="card-title-long">{i.name}</h1>
                          <p id="card-sub-title">2022</p>
                          <p id="card-info">{i.para}</p>


                          <button className="btn" onClick={() => tongle({

                            'videoLink': i.videoLink,
                            'videoPoster': i.videoPoster,
                            'name': i.name,
                            'para': i.para,

                          })} >Watch Now</button>
                        </div>
                      </div>
                      <p className='mname'>{i.name}</p>


                    </div>
                   
                  </li>

                </>
              )
            })}
          </ul>

        </div>

        :
        <Moviepage tongle={tongle} currentData={currentData}  />}
        

    </>

  )
}

export default Maindash;
