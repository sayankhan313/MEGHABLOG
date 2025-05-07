import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { Authlayout} from './components/index.js'
import AllPost from './pages/AllPost.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

const router= createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path: '/',
        element:<Home/>,

      },
      {
        path:'/login',
        element:(
          <Authlayout authentication={false}>
            <Login/>
          </Authlayout>
      )
      },
      {
        path: "/signup",
        element: (
            <Authlayout authentication={false}>
                <Signup />
            </Authlayout>
        ),
    },
    {
        path: "/all-posts",
        element: (
            <Authlayout authentication>
                {" "}
                <AllPost />
            </Authlayout>
        ),
    },
    {
        path: "/add-post",
        element: (
            <Authlayout authentication>
                {" "}
                <AddPost />
            </Authlayout>
        ),
    },
    {
        path: "/edit-post/:slug",
        element: (
            <Authlayout authentication>
                {" "}
                <EditPost />
            </Authlayout>
        ),
    },
    {
        path: "/post/:slug",
        element: < Post />,
    },


    ]
  }
])

createRoot(document.getElementById('root')).render(
 <>
 <StrictMode>
  <Provider store={store}>

   <RouterProvider router={router}/>
  </Provider>
  </StrictMode>
  </>
)
