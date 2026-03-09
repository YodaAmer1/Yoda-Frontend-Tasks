import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"

interface SearchBarProps{
    search: string
    setSearch: (value: string) => void
}
export const SearchBar = ({search, setSearch}: SearchBarProps) => {
    
    const handleChange = (value:string) => {
        setSearch(value);
    }
    
    return(
        <div>
            <TextField 
                value={search}
                onChange={(e)=> handleChange(e.target.value)}
                placeholder="Search Products"
                variant="outlined"
                size="small"
                className="search-input"
                slotProps={{
                    input: {
                    startAdornment: (
                        <InputAdornment position="start">
                        <SearchIcon />
                        </InputAdornment>
                    )
                    }
                }}
                />
        </div>
    )
}