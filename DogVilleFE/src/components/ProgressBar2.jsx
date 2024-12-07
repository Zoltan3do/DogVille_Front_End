function ProgressBar2() {
    return (

        <div className='mb-8'>
            <div className='bg-reddino dark:bg-reddino relative h-4 w-full rounded-2xl'>
                <div className='bg-primary-color absolute top-0 left-0 flex h-full w-1/2 items-center justify-center rounded-2xl text-xs font-semibold text-whiteino'>
                    50%
                </div>
            </div>
        </div>

    )
}
export default ProgressBar2;