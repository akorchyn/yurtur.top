export default function Header() {
    return (
        <header className="flex justify-between items-center bg-main w-full sticky top-0 z-50 p-safe-or-4">
            <a href="/">
                <h1 className="text-2xl text-white font-bold lg:ml-16">
                    Yurtur
                    <span className="ml-1 text-xl font-normal">
                        | Your turn to innovations
                    </span>
                </h1>
            </a>
        </header>
    )
}
