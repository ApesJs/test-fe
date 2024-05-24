import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import AppLayout from './AppLayout.jsx'

export default function EditPost() {
    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [category, setCategory] = useState('')
    const [status, setStatus] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get(`http://localhost:2024/posts/${id}`)
            .then((response) => {
                const post = response.data
                setTitle(post.title)
                setContent(post.content)
                setCategory(post.category)
                setStatus(post.status)
            })
            .catch((error) => console.error('Error fetching post:', error))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .put(`http://localhost:2024/posts/${id}`, {
                title,
                content,
                category,
                status,
            })
            .then(() => {
                navigate('/preview')
            })
            .catch((error) => console.error('Error updating post:', error))
    }
    return (
        <AppLayout>
            <div
                className='absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]'
                aria-hidden='true'
            >
                <div
                    className='relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]'
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
            <div className='mt-32 mx-auto max-w-2xl text-center'>
                <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                    Edit Post
                </h2>
                <p className='mt-2 text-lg leading-8 text-gray-600'>
                    Tes Frontend Sharing Vision 2024
                </p>
            </div>
            <form
                onSubmit={handleSubmit}
                className='mx-auto mt-9 max-w-xl sm:mt-9'
            >
                <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
                    <div className='sm:col-span-2'>
                        <label
                            htmlFor='title'
                            className='block text-sm font-semibold leading-6 text-gray-900'
                        >
                            Title
                        </label>
                        <div className='mt-2.5'>
                            <input
                                type='text'
                                name='title'
                                id='title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                        </div>
                    </div>
                    <div className='sm:col-span-2'>
                        <label
                            htmlFor='content'
                            className='block text-sm font-semibold leading-6 text-gray-900'
                        >
                            Content
                        </label>
                        <div className='mt-2.5'>
                            <textarea
                                name='content'
                                id='content'
                                rows={4}
                                className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='sm:col-span-2'>
                        <label
                            htmlFor='category'
                            className='block text-sm font-semibold leading-6 text-gray-900'
                        >
                            Category
                        </label>
                        <div className='mt-2.5'>
                            <input
                                type='text'
                                name='category'
                                id='category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                        </div>
                    </div>

                    <div className='sm:col-span-2'>
                        <label
                            htmlFor='status'
                            className='block text-sm font-semibold leading-6 text-gray-900'
                        >
                            Status
                        </label>
                        <div className='mt-2.5'>
                            <select
                                id='status'
                                name='status'
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                            >
                                <option value='Publish'>Publish</option>
                                <option value='Draft'>Draft</option>
                                <option value='Thrash'>Thrash</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='mt-10'>
                    <button
                        type='submit'
                        className='block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                        Update Post
                    </button>
                </div>
            </form>
        </AppLayout>
    )
}
