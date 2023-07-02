type HeaderProps = {
    page: string,
    setPageView: (page: string) => void
}

export default function Header({ page, setPageView }: HeaderProps) {
    console.log(page)
    
    const handlePageChange = (page: string) => {
        setPageView(page)
    }
    
    return (
        <>
            <h1>SoulQuotes Header</h1>
        </>
    )
}