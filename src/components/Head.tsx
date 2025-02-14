import "../Header.css";

interface Oneheadline {
    headline: string; 
}

function Header({ headline }: Oneheadline) {


    return (
       
        <>
            <header>
                
            </header>
            <h1>{headline}</h1>
        </>
    );
}
//export
export default Header;


