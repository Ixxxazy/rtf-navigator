import React, {useState} from 'react';
import Searchbar from "../Searchbar/Searchbar";
import Logo from "../Logo/Logo";
import NavbarItem from "./NavbarItem";
import HeaderButton from "./HeaderButton";
import MenuIcon from "@mui/icons-material/Menu";
import Modal from "../Modal/Modal";

const Header = () => {
    const [menu, setMenu] = useState(false);
    /*TODO: Move out of header*/
    class Page {
        link: string;
        name: string;
        constructor(link: string, name: string) {
            this.name = name
            this.link = link
        }
    }
    const pages: Page[] = [
        new Page('/', 'Главная'),
        new Page('/buildings', 'Институты'),
        new Page('/about', 'О сайте'),
        new Page('/login', 'Войти')]

    return (
        <header className={'bg-blue-700 dark:bg-neutral-900 shadow'}>
            <div className={'flex p-3 items-center gap-x-3 container mx-auto'}>
                <Modal visible={menu} setVisible={setMenu}>
                    <nav>
                        <ul className={"gap-3 flex flex-col text-xl"}>
                            {pages.map(e => <NavbarItem onClick={() => setMenu(false)} key={e.link} link={e.link}>{e.name}</NavbarItem>)}
                        </ul>
                    </nav>
                </Modal>
                <HeaderButton title="Открыть меню" type='button' onClick={() => setMenu(true)} className={'text-white md:hidden'}><MenuIcon /></HeaderButton>
                <picture className={'h-full bg-white rounded-full p-2 hidden sm:block'} style={{ width: '3rem' }}>
                    <Logo/>
                </picture>
                <nav className={"text-neutral-100 hidden md:block"}>
                    <ul className={'flex flex-row gap-x-3'}>
                        {pages.map(e => <NavbarItem key={e.link} link={e.link}>{e.name}</NavbarItem>)}
                    </ul>
                </nav>
                <Searchbar placeholder='Р-044' className={'w-full md:w-auto md:ml-auto'}/>
            </div>
        </header>
    );
};

export default Header;