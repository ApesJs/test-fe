import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [category, setCategory] = useState('')
    const [status, setStatus] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post('http://localhost:2024/posts', {
                title,
                content,
                category,
                status,
            })
            .then(() => {
                navigate('/preview')
            })
            .catch((error) => console.error('Error creating post:', error))
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
                <label className='block'>Title</label>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='w-full p-2 border rounded'
                />
            </div>
            <div>
                <label className='block'>Content</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className='w-full p-2 border rounded'
                />
            </div>
            <div>
                <label className='block'>Category</label>
                <input
                    type='text'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className='w-full p-2 border rounded'
                />
            </div>
            <div>
                <label className='block'>Status</label>
                <input
                    type='text'
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className='w-full p-2 border rounded'
                />
            </div>
            <button
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 rounded'
            >
                Create
            </button>
        </form>
    )
}

export default CreatePost
