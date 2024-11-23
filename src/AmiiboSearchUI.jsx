import PropTypes from 'prop-types';

const AmiiboSearchUI = ({term, setTerm, searchAmiibo, parseAmiiboResult}) => {
   return (
        <div>
        <button onClick={() => {searchAmiibo(term, parseAmiiboResult)}}>Search</button>
        <label>
            Name: 
            <input value={term} onChange={e => {setTerm(e.target.value)}} type="text" id="term"/>
        </label>
        </div>
   )
}

AmiiboSearchUI.propTypes = {
    term: PropTypes.string.isRequired,
    setTerm: PropTypes.func.isRequired,
    searchAmiibo: PropTypes.func.isRequired,
    parseAmiiboResult: PropTypes.func.isRequired,
}
export default AmiiboSearchUI;