import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1)
        }
    }

    const handlePageClick = (page) => {
        onPageChange(page)
    }

    return (
        <div className='flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6'>
            <div className='flex flex-1 justify-between sm:hidden'>
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50'
                >
                    Previous
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50'
                >
                    Next
                </button>
            </div>
            <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
                <div>
                    <p className='text-sm text-gray-700'>
                        Showing{' '}
                        <span className='font-medium'>{currentPage}</span> to{' '}
                        <span className='font-medium'>{totalPages}</span> of{' '}
                        <span className='font-medium'>{totalPages * 6}</span>{' '}
                        results
                    </p>
                </div>
                <div>
                    <nav
                        className='isolate inline-flex -space-x-px rounded-md shadow-sm'
                        aria-label='Pagination'
                    >
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50'
                        >
                            <span className='sr-only'>Previous</span>
                            <ChevronLeftIcon
                                className='h-5 w-5'
                                aria-hidden='true'
                            />
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageClick(index + 1)}
                                aria-current={
                                    currentPage === index + 1
                                        ? 'page'
                                        : undefined
                                }
                                className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                    currentPage === index + 1
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-gray-900'
                                } focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50'
                        >
                            <span className='sr-only'>Next</span>
                            <ChevronRightIcon
                                className='h-5 w-5'
                                aria-hidden='true'
                            />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}
