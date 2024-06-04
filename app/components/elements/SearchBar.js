const SearchBar = ({styles , placeHolder }) => {
    return (
        <>
           <input type="text" className={styles} placeholder={placeHolder} /> 
        </>
    );
}

export default SearchBar;