function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-dark text-light text-center ">
            <div>
                <h1 className="text-9xl font-bold">404</h1>
                <p className="text-2xl">Page Not Found</p>
                <a
                    href="/"
                    className="inline-block mt-4 px-6 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-black transition-colors"
                >
                    Torna all&apos;home
                </a>
            </div>
        </div>
    )
}
export default NotFoundPage;