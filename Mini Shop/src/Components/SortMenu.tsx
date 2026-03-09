import SwapVertIcon from "@mui/icons-material/SwapVert";
import { FormControl, MenuItem, Select } from '@mui/material';

interface SortMenuProps {
    sortType: string
    setSortType: (value: string) => void
}

export const SortMenu = ({sortType, setSortType}: SortMenuProps) => {

    
    return (
        <div style={{ display: "flex", alignItems: "center"}}>
            <SwapVertIcon style={{color:"white", fontSize:30}}/>
            <FormControl size="small" style={{backgroundColor: "white"}}>
            <Select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                displayEmpty
            >
                <MenuItem value="">
                Sort By
                </MenuItem>

                <MenuItem value="sortBy=price&order=asc">
                Price : Low → High
                </MenuItem>

                <MenuItem value="sortBy=price&order=desc">
                Price : High → Low
                </MenuItem>

                <MenuItem value="sortBy=title&order=asc">
                Name : A → Z
                </MenuItem>

                <MenuItem value="sortBy=title&order=desc">
                Name : Z → A
                </MenuItem>
            </Select>
            </FormControl>
        </div>
    )
}