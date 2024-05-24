import { useState, useEffect } from 'react'
import axios from 'axios'
import AppLayout from './AppLayout.jsx'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Pagination from './Pagination.jsx'
import AllPostTabs from './AllPostTabs.jsx'
import { IconPencil, IconTrash } from '@tabler/icons-react'

export default function AllPostPublished() {
    const { id } = useParams()
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const navigate = useNavigate()

    useEffect(() => {
        fetchPosts(currentPage)
    }, [currentPage])

    const fetchPosts = (page) => {
        axios
            .get(`http://localhost:2024/posts/page/${page}`)
            .then((response) => {
                const publishedPosts = response.data.data_posts.filter(
                    (post) => post.status.toLowerCase() === 'draft',
                )
                setPosts(publishedPosts)
                setTotalPages(response.data.pagination.TotalPages)
            })
            .catch((error) => console.error('Error fetching posts:', error))
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const handleTrashClick = (postId) => {
        axios
            .put(`http://localhost:2024/posts/trashed/${postId}`)
            .then(() => {
                fetchPosts(currentPage)
            })
            .catch((error) => console.error('Error trashing post:', error))
    }

    return (
        <AppLayout>
            <AllPostTabs />
            <div className='mt-44 relative overflow-x-auto shadow-md sm:rounded-lg'>
                <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                        <tr>
                            <th scope='col' className='px-6 py-3'>
                                Title
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Category
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Status
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr
                                key={post.ID}
                                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                            >
                                <th
                                    scope='row'
                                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                                >
                                    {post.title.slice(0, 100) + '...'}
                                </th>
                                <td className='px-6 py-4'>{post.category}</td>
                                <td className='px-6 py-4'>{post.status}</td>
                                <td className='px-6 py-4'>
                                    <Link
                                        to={`/edit/${post.ID}`}
                                        className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                                    >
                                        <IconPencil />
                                    </Link>
                                    <button
                                        onClick={() =>
                                            handleTrashClick(post.ID)
                                        }
                                    >
                                        <IconTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </AppLayout>
    )
}
