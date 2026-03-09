import { FormControl, MenuItem, Select } from '@mui/material';
interface CategoriesProps {
    category : string
    setCategory :(value : string) => void
    categoriesList: string[]
}
export const Categories = ({category,setCategory, categoriesList}: CategoriesProps) => {

    return (
        <div>
            <div style={{ display: "flex", alignItems: "center"}}>
            <FormControl size="small" style={{backgroundColor: "white"}}>
            <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                displayEmpty
                renderValue={(selected) => {
                    if (!selected) return "Category"
                    return selected
                }}
                MenuProps={{
                    PaperProps: {
                    style: {
                        maxHeight: 200,
                    }
                    }
                }}
            >
                <MenuItem value="">
                 All
                </MenuItem>
                {categoriesList.map((category) => (
                    <MenuItem key={category} value={category}>
                        {category.replaceAll("-"," ")}
                    </MenuItem>
                ))}
            </Select>
            </FormControl>
        </div>
        </div>
    )
}