
function Header() {



    return (
        <header className=" w-full flex justify-center items-center gap-4 bg-primary text-secondary ">
                <a className="navbar-brand"  href="#">
                    <img className=" size-14" src="/logo.png" alt="logo juego" />
                </a>
                <h1 className=" text-5xl font-bold">Batalla Naval</h1>
        </header>
    )
}

export default Header;