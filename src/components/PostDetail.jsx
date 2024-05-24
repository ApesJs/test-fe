import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import AppLayout from './AppLayout.jsx'

export default function PostDetail() {
    const { id } = useParams()
    const [post, setPost] = useState(null)

    useEffect(() => {
        axios
            .get(`http://localhost:2024/posts/${id}`)
            .then((response) => setPost(response.data))
            .catch((error) => console.error('Error fetching post:', error))
    }, [id])

    if (!post) {
        return <div>Loading...</div>
    }
    return (
        <AppLayout>
            <div className='mx-auto max-w-7xl px-6 lg:px-8'>
                <div className='mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none'>
                    <div className='p-8 sm:p-10 lg:flex-auto'>
                        <h3 className='mb-2 h-6 font-bold flex-none text-indigo-600'>
                            Category : {post.category}
                        </h3>
                        <h3 className='text-2xl font-bold tracking-tight text-gray-900'>
                            {post.title}
                        </h3>
                        <p className='mt-6 text-base leading-7'>
                            {post.content}
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
