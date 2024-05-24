import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PostDetail from './components/PostDetail'
import CreatePost from './components/CreatePost'
import EditPost from './components/EditPost'
import Preview from './components/Preview.jsx'
import AppLayout from './components/AppLayout.jsx'
import AllPosts from './components/AllPostPublished.jsx'
import AllPostDrafted from "./components/AllPostDrafted.jsx";
import AllPostTrashed from "./components/AllPostTrashed.jsx";
import AllPostPublished from "./components/AllPostPublished.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path='/'
                    element={
                        <AppLayout>
                            <div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'>
                                <div className='text-center'>
                                    <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
                                        Tes Frontend Sharing Vision 2024
                                    </h1>
                                </div>
                            </div>
                        </AppLayout>
                    }
                />
                <Route path='/preview' element={<Preview />} />
                <Route path='/all-post-published' element={<AllPostPublished />} />
                <Route path='/all-post-drafted' element={<AllPostDrafted />} />
                <Route path='/all-post-trashed' element={<AllPostTrashed />} />
                <Route path='/posts/:id' element={<PostDetail />} />
                <Route path='/create' element={<CreatePost />} />
                <Route path='/edit/:id' element={<EditPost />} />
            </Routes>
        </Router>
    )
}

export default App
