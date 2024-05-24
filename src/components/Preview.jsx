import { useState, useEffect } from 'react'
import axios from 'axios'
import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'
import AppLayout from './AppLayout.jsx'
import Pagination from './Pagination.jsx'

export default function Preview() {
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        fetchPosts(currentPage)
    }, [currentPage])

    const fetchPosts = (page) => {
        axios
            .get(`http://localhost:2024/posts/page/${page}`)
            .then((response) => {
                const publishedPosts = response.data.data_posts.filter(
                    (post) => post.status.toLowerCase() === 'publish',
                )
                setPosts(publishedPosts)
                setTotalPages(response.data.pagination.TotalPages)
            })
            .catch((error) => console.error('Error fetching posts:', error))
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    return (
        <AppLayout>
            <div className='mt-20 mx-auto max-w-7xl px-6 lg:px-8'>
                <div className='mx-auto max-w-2xl lg:mx-0'>
                    <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                        Preview
                    </h2>
                    <p className='mt-2 text-lg leading-8 text-gray-600'>
                        Semua Data Post Dengan Status Publish.
                    </p>
                </div>
                <div className='mb-10 mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
                    {posts.map((post) => (
                        <article
                            key={post.ID}
                            className='flex max-w-xl flex-col items-start justify-between'
                        >
                            <div className='flex items-center gap-x-4 text-xs'>
                                <time
                                    dateTime={post.CreatedAt}
                                    className='text-gray-500'
                                >
                                    {formatDistanceToNow(
                                        new Date(post.CreatedAt),
                                        { addSuffix: true, locale: id },
                                    )}
                                </time>
                                <span className='text-gray-500'>
                                    Category : {post.category}
                                </span>
                            </div>
                            <div className='group relative'>
                                <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600'>
                                    <a href={`/posts/${post.ID}`}>
                                        <span className='absolute inset-0' />
                                        {post.title}
                                    </a>
                                </h3>
                                <p className='mt-5 line-clamp-3 text-sm leading-6 text-gray-600'>
                                    {post.content}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </AppLayout>
    )
}
