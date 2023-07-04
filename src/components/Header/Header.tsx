import { User } from "../../types"

type HeaderProps = {
    page: string,
    user: User | null
    setPageView: (page: string) => void,
}

export default function Header({ page, user, setPageView }: HeaderProps) {
    console.log(`page: ${page}`)
    console.log(user);
    
    return (
        <>
            <h1>SoulQuotes Header</h1>
        </>
    )
}