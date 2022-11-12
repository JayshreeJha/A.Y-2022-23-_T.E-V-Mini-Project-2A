import React , {useEffect, useState} from 'react'
import '../PagesCss/UserProfile.css'
import profileimage from '../images/profile.png'

const UserProfile = (props) => {
    const [userdata, setUser] = useState(null)

    useEffect(()=>{setUser(props.setLoginUser)},[])
  return (
    <>
    <div className='profilebg'>
      
    </div>
    {userdata ? ( 
        <>
        
       <div className='profilebg'>

        
        <div className='center'>
          <img className='profileimg' src={profileimage} alt="profileimage" />

        </div>
       </div>
        <div className='cardprofile'>

          <h1 className='head'>
            {` ${userdata.name} `}
            <h1>
            {`Email: ${userdata.email} `}
            
           
        </h1>
       
        
        <h1>{`id:${userdata._id}`}</h1>

        </h1>
        {window.emailid=`${userdata.email}`}
        <button className='like_buton'>

        <i class=" fa-sharp fa-solid fa-heart"></i>
        
        </button>
        <button className='save_buton'>

        <i class="fa-sharp fa-solid fa-bookmark"></i>
        </button>
        <button className='send_button'>

        <i class="fa-sharp fa-solid fa-paper-plane"></i>
        </button>
        </div>
        
        </>
    ) : ("")}
    </>
  )
}
export default UserProfile