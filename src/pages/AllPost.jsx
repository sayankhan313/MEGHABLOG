import React ,{useState,useEffect} from 'react'
import appwriteService from "../appwrite/config"
import { PostCard, Container } from '../components'
import { useSelector } from 'react-redux'
function AllPost() {
    const [posts, setPosts] = useState([])
    const  authStatus=useSelector((state)=>state.auth.data)
    useEffect(() => {
      appwriteService.getPosts([]).then((posts) => {
        if (posts) {
          setPosts(posts.documents); // Appwrite ke response se 'documents' nikal rahe ho
        }else{
          setPosts([]); // Agar posts nahi hain, toh empty array set karo
        }
      });
    }, [authStatus]);
    
      

  return (
    <div className='w-full py-8'>
<Container>
  <div className='flex flex-wrap'>
    {posts.map((post)=>(
      <div key={post.$id} className='p-2 w-1/4'> 
      <PostCard {...post}/>
        </div>
    ))}

  </div>
  
</Container>
    </div>
  )
}

export default AllPost
